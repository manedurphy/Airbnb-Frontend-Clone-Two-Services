terraform {
  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = ">= 2.0"
    }
  }
}

provider "kubernetes" {
  config_path = var.kubeconfig_path
}

resource "kubernetes_secret" "db-creds" {
  metadata {
    name = "db-creds"
  }

  data = {
    mysql_user = var.mysql_user
    mysql_password = var.mysql_password
    mysql_properties_db = var.mysql_properties_db
    mysql_hosts_db = var.mysql_hosts_db
    host = var.host
  }
}

resource "kubernetes_secret" "linode-personal-access-token-k8s-autoscaler" {
  metadata {
    name = "linode-personal-access-token-k8s-autoscaler"
  }

  data = {
    token = var.linode_personal_access_token_k8s_autoscaler
  }
}

resource "kubernetes_secret" "docker-registry" {
  metadata {
    name = "docker-cfg"
  }

  data = {
    ".dockerconfigjson" = <<DOCKER
{
  "auths": {
    "${var.docker_server}": {
      "auth": "${base64encode("${var.docker_username}:${var.docker_password}")}"
    }
  }
}
DOCKER
  }

  type = "kubernetes.io/dockerconfigjson"
}

resource "kubernetes_deployment" "static-deploy" {
  metadata {
    name = "static-deploy"
    labels = {
      app = "static-deploy"
    }
  }

  spec {
    replicas = 1
    selector {
      match_labels = {
        app = "static-deploy"
      }
    }
    template {
      metadata {
        labels = {
          app = "static-deploy"
        }
      }
      spec {
        container {
          image = "manedurphy/static-files:1.0.0"
          name = "static-files"
          port {
            container_port = 80
          }
          env {
            name = "HOSTS_API"
            value = "http://hosts-api-service:8080"
          }
          env {
            name = "PROPERTIES_API"
            value = "http://properties-api-service:8081"
          }

          resources {
            requests = {
              cpu = "50m"
              memory = "100Mi"
            }
            limits = {
              cpu = "200m"
              memory = "200Mi"
            }
          }

          liveness_probe {
            http_get {
              path = "/healthz"
              port = 5000
            }

            initial_delay_seconds = 3
            period_seconds        = 3
          }
          
          startup_probe {
            http_get {
              path = "/healthz"
              port = 5000
            }

            failure_threshold = 30
            period_seconds    = 10
          }
        }
      }
    }
  }
}

resource "kubernetes_deployment" "redis-read-deploy" {
  metadata {
    name = "redis-read-deploy"
    labels = {
      app = "redis-read-deploy"
    }
  }

  spec {
    replicas = 1
    selector {
      match_labels = {
        app = "redis-read-deploy"
      }
    }

    template {
      metadata {
        labels = {
          app = "redis-read-deploy"
        }
      }
      spec {
        container {
          image = "redis:6.2.3-alpine"
          name = "redis-read-container"
          command = [
            "redis-server"
          ]

          args = [
            "--replicaof",
            "redis-write-service.default.svc.cluster.local",
            "6379",
            "--protected-mode",
            "no"
          ]

          resources {
            requests = {
              cpu = "25m"
              memory = "50Mi"
            }
            limits = {
              cpu = "50m"
              memory = "75Mi"
            }
          }

        }
      }
    }
  }
}

resource "kubernetes_deployment" "redis-write-deploy" {
  metadata {
    name = "redis-write-deploy"
    labels = {
      app = "redis-write-deploy"
    }
  }

  spec {
    replicas = 1
    selector {
      match_labels = {
        app = "redis-write-deploy"
      }
    }

    template {
      metadata {
        labels = {
          app = "redis-write-deploy"
        }
      }
      spec {
        container {
          image = "redis:6.2.3-alpine"
          name = "redis-write-container"
          command = [
            "redis-server"
          ]

          args = [
            "--protected-mode",
            "no"
          ]

        }
      }
    }
  }
}

resource "kubernetes_deployment" "hosts-api-deploy" {
  metadata {
    name = "hosts-api-deploy"
    labels = {
      app = "hosts-api-deploy"
    }
  }

  spec {
    replicas = 1
    selector {
      match_labels = {
        app = "hosts-api-deploy"
      }
    }
    template {
      metadata {
        labels = {
          app = "hosts-api-deploy"
        }
      }
      spec {
        container {
          image = "manedurphy/hosts-api:1.0.0"
          name = "hosts-api-container"
          port {
            container_port = 8080
          }
          env {
            name = "HOST"
            value_from {
              secret_key_ref {
                name = "db-creds"
                key = "host"
              }
            }
          }
          env {
            name = "MYSQL_USER"
            value_from {
              secret_key_ref {
                name = "db-creds"
                key = "mysql_user"
              }
            }
          }
          env {
            name = "MYSQL_PASSWORD"
            value_from {
              secret_key_ref {
                name = "db-creds"
                key = "mysql_password"
              }
            }
          }
          env {
            name = "MYSQL_DB"
            value_from {
              secret_key_ref {
                name = "db-creds"
                key = "mysql_properties_db"
              }
            }
          }

          resources {
            requests = {
              cpu = "50m"
              memory = "100Mi"
            }
            limits = {
              cpu = "200m"
              memory = "200Mi"
            }
          }

          liveness_probe {
            http_get {
              path = "/hosts/healthz"
              port = 8080
            }

            initial_delay_seconds = 3
            period_seconds        = 3
          }
          
          startup_probe {
            http_get {
              path = "/hosts/healthz"
              port = 8080
            }

            failure_threshold = 30
            period_seconds    = 10
          }
        }
      }
    }
  }
}

resource "kubernetes_deployment" "properties-api-deploy" {
  metadata {
    name = "properties-api-deploy"
    labels = {
      app = "properties-api-deploy"
    }
  }

  spec {
    replicas = 1
    selector {
      match_labels = {
        app = "properties-api-deploy"
      }
    }
    template {
      metadata {
        labels = {
          app = "properties-api-deploy"
        }
      }
      spec {
        container {
          image = "manedurphy/properties-api:1.0.0"
          name = "properties-api-container"
          port {
            container_port = 8081
          }
          env {
            name = "HOSTS_API"
            value = "http://hosts-api-service:8080"
          }
          env {
            name = "HOST"
            value_from {
              secret_key_ref {
                name = "db-creds"
                key = "host"
              }
            }
          }
          env {
            name = "MYSQL_USER"
            value_from {
              secret_key_ref {
                name = "db-creds"
                key = "mysql_user"
              }
            }
          }
          env {
            name = "MYSQL_PASSWORD"
            value_from {
              secret_key_ref {
                name = "db-creds"
                key = "mysql_password"
              }
            }
          }
          env {
            name = "MYSQL_DB"
            value_from {
              secret_key_ref {
                name = "db-creds"
                key = "mysql_hosts_db"
              }
            }
          }

          resources {
            requests = {
              cpu = "50m"
              memory = "100Mi"
            }
            limits = {
              cpu = "200m"
              memory = "200Mi"
            }
          }

          liveness_probe {
            http_get {
              path = "/properties/healthz"
              port = 8081
            }

            initial_delay_seconds = 3
            period_seconds        = 3
          }
          
          startup_probe {
            http_get {
              path = "/properties/healthz"
              port = 8081
            }

            failure_threshold = 30
            period_seconds    = 10
          }
        }
      }
    }
  }
}

resource "kubernetes_deployment" "get-data-api-deploy" {
  metadata {
    name = "get-data-api-deploy"
    labels = {
      app = "get-data-api-deploy"
    }
  }

  spec {
    replicas = 1
    selector {
      match_labels = {
        app = "get-data-api-deploy"
      }
    }
    template {
      metadata {
        labels = {
          app = "get-data-api-deploy"
        }
      }
      spec {
        container {
          image = "manedurphy/get-data-api:1.0.0"
          name = "get-data-api-container"
          port {
            container_port = 8000
          }
          env {
            name = "HOSTS_API"
            value = "http://hosts-api-service:8080"
          }
          env {
            name = "PROPERTIES_API"
            value = "http://properties-api-service:8081"
          }
          env {
            name = "REDIS_READ_URL"
            value = "redis-read-service:6379"
          }
          env {
            name = "REDIS_WRITE_URL"
            value = "redis-write-service:6379"
          }

          resources {
            requests = {
              cpu = "50m"
              memory = "100Mi"
            }
            limits = {
              cpu = "200m"
              memory = "200Mi"
            }
          }

          liveness_probe {
            http_get {
              path = "/api/healthz"
              port = 8000
            }

            initial_delay_seconds = 3
            period_seconds        = 3
          }
          
          startup_probe {
            http_get {
              path = "/api/healthz"
              port = 8000
            }

            failure_threshold = 30
            period_seconds    = 10
          }
        }
      }
    }
  }
}

resource "kubernetes_deployment" "k8s-autoscaler" {
  metadata {
    name = "k8s-autoscaler"
    labels = {
      app = "k8s-autoscaler"
    }
  }

  spec {
    replicas = 1
    strategy {
      type = "RollingUpdate"
      rolling_update {
        max_surge = 1
        max_unavailable = 0
      }
    }
    selector {
      match_labels = {
        app = "k8s-autoscaler"
      }
    }

    template {
      metadata {
        labels = {
          app = "k8s-autoscaler"
        }
      }
      spec {
        image_pull_secrets {
          name = "docker-cfg"
        }
        container {
          image = "manedurphy/linode-autoscaler"
          name = "k8s-autoscale"
          env {
            name = "LINODE_PERSONAL_ACCCESS_TOKEN"
            value_from {
              secret_key_ref {
                name = "linode-personal-access-token-k8s-autoscaler"
                key = "token"
              }
            }
          }

          env {
            name = "LINODE_LKE_CLUSTER_ID"
            value = "28912"
          }

          env {
            name = "LINODE_LKE_CLUSTER_POOL_MINIMUM_NODES"
            value = "3"
          }
          env {
            name = "LINODE_LKE_CLUSTER_POOL_ID"
            value = "43352"
          }
          env {
            name = "AUTOSCALE_TRIGGER"
            value = "cpu"
          }
          env {
            name = "AUTOSCALE_UP_PERCENTAGE"
            value = "60"
          }
          env {
            name = "AUTOSCALE_DOWN_PERCENTAGE"
            value = "30"
          }
          env {
            name = "AUTOSCALE_QUERY_INTERVAL"
            value = "15"
          }
          env {
            name = "AUTOSCALE_THRESHOLD_COUNT"
            value = "3"
          }
          env {
            name = "AUTOSCALE_NUMBER_OF_NODES"
            value = "1"
          }
          env {
            name = "AUTOSCALE_WAIT_TIME_AFTER_SCALING"
            value = "150"
          }

          resources {
            requests = {
              memory = "32Mi"
            }
            limits = {
              memory = "32Mi"
            }
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "static-files-service" {
  metadata {
    name = "static-files-service"
  }
  spec {
    selector = {
      app = "static-deploy"
    }
    port {
      port = 5000
      protocol = "TCP"
    }
  }
}

resource "kubernetes_service" "properties-api-service" {
  metadata {
    name = "properties-api-service"
  }
  spec {
    selector = {
      app = "properties-api-deploy"
    }
    port {
      port = 8081
      protocol = "TCP"
    }
  }
}

resource "kubernetes_service" "hosts-api-service" {
  metadata {
    name = "hosts-api-service"
  }
  spec {
    selector = {
      app = "hosts-api-deploy"
    }
    port {
      port = 8080
      protocol = "TCP"
    }
  }
}

resource "kubernetes_service" "get-data-api-service" {
  metadata {
    name = "get-data-api-service"
  }
  spec {
    selector = {
      app = "get-data-api-deploy"
    }
    port {
      port = 8000
      protocol = "TCP"
    }
  }
}

resource "kubernetes_service" "redis-write-service" {
  metadata {
    name = "redis-write-service"
  }
  spec {
    selector = {
      app = "redis-write-deploy"
    }
    port {
      port = 6379
      protocol = "TCP"
    }
  }
}

resource "kubernetes_service" "redis-read-service" {
  metadata {
    name = "redis-read-service"
  }
  spec {
    selector = {
      app = "redis-read-deploy"
    }
    port {
      port = 6379
      protocol = "TCP"
    }
  }
}

resource "kubernetes_ingress" "airbnb-ingress" {
  metadata {
    name = "airbnb-ingress"
  }

  spec {
    rule {
      http {
        path {
          backend {
            service_name = "static-files-service"
            service_port = 5000
          }

          path = "/rooms/"
        }
        
        path {
          backend {
            service_name = "static-files-service"
            service_port = 5000
          }

          path = "/"
        }

        path {
          backend {
            service_name = "properties-api-service"
            service_port = 8081
          }

          path = "/properties"
        }
       
        path {
          backend {
            service_name = "hosts-api-service"
            service_port = 8080
          }

          path = "/hosts"
        }
        
        path {
          backend {
            service_name = "get-data-api-service"
            service_port = 8000
          }

          path = "/api/"
        }
      }
    }
  }
}

resource "kubernetes_horizontal_pod_autoscaler" "hosts-api-deploy" {
  metadata {
    name = "hosts-api-deploy"
  }

  spec {
    max_replicas = 20
    min_replicas = 2

    scale_target_ref {
      api_version = "apps/v1"
      kind = "Deployment"
      name = "hosts-api-deploy"
    }

    target_cpu_utilization_percentage = 80
  }
}

resource "kubernetes_horizontal_pod_autoscaler" "properties-api-deploy" {
  metadata {
    name = "properties-api-deploy"
  }

  spec {
    max_replicas = 20
    min_replicas = 2

    scale_target_ref {
      api_version = "apps/v1"
      kind = "Deployment"
      name = "properties-api-deploy"
    }

    target_cpu_utilization_percentage = 80
  }
}

resource "kubernetes_horizontal_pod_autoscaler" "get-data-api-deploy" {
  metadata {
    name = "get-data-api-deploy"
  }

  spec {
    max_replicas = 50
    min_replicas = 5

    scale_target_ref {
      api_version = "apps/v1"
      kind = "Deployment"
      name = "get-data-api-deploy"
    }

    target_cpu_utilization_percentage = 50
  }
}

resource "kubernetes_horizontal_pod_autoscaler" "static-deploy" {
  metadata {
    name = "static-deploy"
  }

  spec {
    max_replicas = 50
    min_replicas = 5

    scale_target_ref {
      api_version = "apps/v1"
      kind = "Deployment"
      name = "static-deploy"
    }

    target_cpu_utilization_percentage = 50
  }
}

resource "kubernetes_horizontal_pod_autoscaler" "redis-read-deploy" {
  metadata {
    name = "redis-read-deploy"
  }

  spec {
    max_replicas = 25
    min_replicas = 3

    scale_target_ref {
      api_version = "apps/v1"
      kind = "Deployment"
      name = "redis-read-deploy"
    }

    target_cpu_utilization_percentage = 85
  }
}
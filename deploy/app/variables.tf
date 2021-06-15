variable "kubeconfig_path" {
  type = string
  default = "../../kubeconfig/kubeconfig.yaml"
}

variable "mysql_user" {
  type = string
  sensitive = true
}

variable "mysql_password" {
  type = string
  sensitive = true
}

variable "mysql_properties_db" {
  type = string
  sensitive = true
}

variable "mysql_hosts_db" {
  type = string
  sensitive = true
}

variable "host" {
  type = string
  sensitive = true
}

variable "docker_server" {
  type = string
  sensitive = true
}

variable "docker_username" {
  type = string
  sensitive = true
}

variable "docker_password" {
  type = string
  sensitive = true
}

variable "docker_email" {
  type = string
  sensitive = true
}

variable "linode_personal_access_token_k8s_autoscaler" {
  type = string
  sensitive = true
}
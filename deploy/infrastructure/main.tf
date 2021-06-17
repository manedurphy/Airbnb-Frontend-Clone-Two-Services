terraform {
  required_providers {
    linode = {
      source  = "linode/linode"
	    version = "1.18.0"
    }
  }
}

provider "linode" {
  token = var.linode_token
}

resource "linode_lke_cluster" "airbnb-clone" {
    label       = "airbnb-clone"
    k8s_version = "1.21"
    region      = "us-west"
    tags        = ["prod"]

    pool {
        type  = "g6-standard-2"
        count = 3
    }
}

resource "linode_instance" "database" {
    label = "airbnb-clone-db"
    image = var.mysql_image_id
    region = "us-west"
    type = "g6-standard-2"
    authorized_keys = [var.authorized_key]
    root_pass = var.mysql_instance_password

    tags = ["prod"]
    timeouts {
      create = "4m"
    }
}
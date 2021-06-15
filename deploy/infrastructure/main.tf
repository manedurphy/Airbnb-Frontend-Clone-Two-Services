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

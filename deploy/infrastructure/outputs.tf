output "id" {
	description = "cluster id"
	value = linode_lke_cluster.airbnb-clone.id
}

output "status" {
	description = "cluster status"
	value = linode_lke_cluster.airbnb-clone.status
}

output "pool" {
	description = "cluster pool"
	value = linode_lke_cluster.airbnb-clone.pool
}
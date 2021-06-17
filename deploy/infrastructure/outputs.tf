output "cluster_id" {
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

output "database_instance_status" {
	description = "database instance status"
	value = linode_instance.database.status
}

output "database_instance_ipv4" {
	description = "database instance public IP"
	value = linode_instance.database.ipv4
}

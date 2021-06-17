variable "linode_token" {
  description = "Linode token"
  type        = string
  sensitive   = true
}

variable "root_pass_db" {
  description = "Root password for database"
  type        = string
  sensitive   = true
}

variable "mysql_image_id" {
  description = "Database image ID"
  type        = string
  sensitive   = true
}

variable "mysql_instance_password" {
  description = "Database instance password"
  type        = string
  sensitive   = true
}

variable "authorized_key" {
  description = "Public key for database instance"
  type        = string
  sensitive   = true
}

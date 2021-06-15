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

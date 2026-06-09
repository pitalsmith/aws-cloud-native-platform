resource "aws_s3_bucket" "this" {
  bucket = "dev-frontend-${random_integer.suffix.result}"
}

resource "random_integer" "suffix" {
  min = 1000
  max = 9999
}
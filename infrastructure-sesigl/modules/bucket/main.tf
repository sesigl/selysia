resource "aws_s3_bucket" "b" {
  bucket = var.name
}

resource "aws_s3_bucket_acl" "example" {
  bucket = aws_s3_bucket.b.id
  acl    = "public-read"
}

resource "aws_s3_bucket_cors_configuration" "example" {
  bucket = aws_s3_bucket.b.id
  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET"]
    allowed_origins = ["https://www.selysium.com"]
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }
}
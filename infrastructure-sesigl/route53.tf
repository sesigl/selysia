resource "aws_route53_zone" "primary" {
  name = "selysia.com"
}


resource "aws_route53_record" "verify" {
  zone_id = aws_route53_zone.primary.zone_id
  name    = ""
  type    = "A"
  ttl     = 300
  records = ["76.76.21.21"]
}

resource "aws_route53_record" "cname" {
  zone_id = aws_route53_zone.primary.zone_id
  name    = "www"
  type    = "CNAME"
  ttl     = 300
  records = ["cname.vercel-dns.com"]
}

resource "aws_route53_record" "selysia_txt" {
  zone_id = aws_route53_zone.primary.zone_id
  name    = ""
  type    = "TXT"
  ttl     = 300
  records = [
    "sendinblue-code:ad6492b82d7f0b7cf48cbe7658d06a6c",
    "v=spf1 include:spf.sendinblue.com mx ~all"
  ]
}
resource "aws_route53_record" "selysia_mail_domain" {
  zone_id = aws_route53_zone.primary.zone_id
  name    = "mail._domainkey"
  type    = "TXT"
  ttl     = 300
  records = [
    "k=rsa;p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDeMVIzrCa3T14JsNY0IRv5/2V1/v2itlviLQBwXsa7shBD6TrBkswsFUToPyMRWC9tbR/5ey0nRBH0ZVxp+lsmTxid2Y2z+FApQ6ra2VsXfbJP3HE6wAO0YTVEJt1TmeczhEd2Jiz/fcabIISgXEdSpTYJhb0ct0VJRxcg4c8c7wIDAQAB"
  ]
}

resource "aws_acm_certificate" "cert" {
  domain_name       = "posts.selysia.com"
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}
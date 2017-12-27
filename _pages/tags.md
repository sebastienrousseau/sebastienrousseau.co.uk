---
layout: default
title: Tags
permalink: /tags/
---

# All tags

{% capture site_tags %}{% for tag in site.tags %}{{ tag | first }}{% unless forloop.last %},{% endunless %}{% endfor %}{% endcapture %}
{% assign tags = site_tags | split:',' | sort %}
{% include tagcloud.html %}

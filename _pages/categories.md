---
layout: default
title: Categories
permalink: /categories/
---
## All categories

{% for category in site.categories %}
###### {{ category | first | capitalize }} ({{ category | last | size }})
{% for post in category.last %}
*   [{{post.title}} - {{ post.date | date_to_string }}]({{ site.url }}{{ post.url }})
{% endfor %}
{% endfor %}

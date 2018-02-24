---
layout: default
title: Archive
permalink: /archive/
---

## All posts
    {% for post in site.posts %}
    {% unless post.next %}
### {{ post.date | date: '%Y' }}
    {% else %}
      {% capture year %}{{ post.date | date: '%Y' }}{% endcapture %}
      {% capture nyear %}{{ post.next.date | date: '%Y' }}{% endcapture %}
    {% if year != nyear %}

### {{ post.date | date: '%Y' }}
    {% endif %}
    {% endunless %}
*   {{ post.date | date: "%b %-d" }} - [{{ post.title }}]({{ site.url }}{{ post.url }})
    {% endfor %}

Subscribe [via RSS]({{ "/atom.xml" | prepend: site_url }})

---
layout: page
permalink: /repositories/
title: Repositories
description: Open-source implementations and research projects in medical imaging, computer vision, and multimodal AI.
nav: true
nav_order: 4
---

{% if site.data.repositories.github_users %}

## GitHub Profile

<div class="repository-grid repository-profile-grid">
  {% for user in site.data.repositories.github_users %}
    {% include repository/repo_user.liquid username=user %}
  {% endfor %}
</div>
{% endif %}

{% if site.data.repositories.github_repos %}

## Selected Repositories

<div class="repository-grid">
  {% for repo in site.data.repositories.github_repos %}
    {% include repository/repo.liquid repository=repo %}
  {% endfor %}
</div>
{% endif %}

<script defer src="{{ '/assets/js/repository-stars.js' | relative_url | bust_file_cache }}"></script>

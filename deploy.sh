#!/bin/bash
setup() {
  set -e # Exit with nonzero exit code if anything fails
  rev=$(git rev-parse --short HEAD)
  echo "Starting deploy to http://sebastienrousseau.co.uk"
  # Build the docs page locally
  export JEKYLL_ENV="production"
  bundle exec jekyll build
}

setup_git() {
  git config --global user.email "release@sebastienrousseau.co.uk"
  git config --global user.name "Release Bot"
}

commit() {
    git reset --hard HEAD
    git checkout -b gh-pages
    git remote add upstream "https://$GH_TOKEN@github.com/reedia/sebastienrousseau.co.uk.git"
    git add -A
    git commit -m "Deployed by Reedia Limited with $(jekyll -v)"
}

push() {
  git push upstream gh-pages --force
  git checkout master
  echo "Deployed successfully, check out http://sebastienrousseau.co.uk"
  exit 0
}

setup
setup_git
commit
push

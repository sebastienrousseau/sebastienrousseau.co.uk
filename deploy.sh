#!/bin/bash
pre-setup() {
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

commit_generated() {
    git reset --hard HEAD
    git checkout -b gh-pages
    git commit --message "Travis build: ${TRAVIS_BUILD_NUMBER}"
}

push() {
  git remote add upstream "https://$GH_TOKEN@github.com/reedia/sebastienrousseau.co.uk.git"
  # Commit all the changes and push it to the remote
  git add -A
  git commit -m "Deployed by Reedia Limited with $(jekyll -v)"
  git push upstream gh-pages --force
  git checkout master
  echo "Deployed successfully, check out http://sebastienrousseau.co.uk"
  exit 0
}

pre-setup
setup_git
commit_generated
push

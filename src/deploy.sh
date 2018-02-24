#!/bin/bash
DEPLOY_REPO="https://$GH_TOKEN@github.com/reedia/sebastienrousseau.co.uk.git"

echo "-- Deploying changes on sebastienrousseau.co.uk"

setup() {
  set -e # Exit with nonzero exit code if anything fails

  rev=$(git rev-parse --short HEAD)

  echo "-- Starting deploy to https://sebastienrousseau.co.uk"

  # Build the docs page locally
  export JEKYLL_ENV="production"
  bundle exec jekyll build
}

setup_git() {
  git config --global user.email "release@sebastienrousseau.co.uk"
  git config --global user.name "Release Bot"

  # Delete old directories (if any)
  rm -rf "/tmp/sebastienrousseau.co.uk"

  # Copy the generated website to the temporary directory
  cp -R "_site/" "/tmp/sebastienrousseau.co.uk"

  # Check out gh-pages and clear all files
  git reset --hard HEAD
  # we don't want the `git checkout` to cause issues (e.g. https://circleci.com/gh/fastlane/docs/730)
  git checkout -b gh-pages
  git remote add upstream $DEPLOY_REPO

  #git pull
  rm -rf *

  # Copy the finished HTML pages to the current directory
  cp -R /tmp/sebastienrousseau.co.uk/* .

  # We need a CNAME file for GitHub
  echo "sebastienrousseau.co.uk" > "CNAME"
}

commit() {
  # Commit all the changes and push it to the remote
  git add -A
  git commit -m "Version $(git rev-parse --short HEAD) built with $(jekyll -v)"
  git push upstream gh-pages --force # force needed, as travis somehow can't re-use branches
  echo "-- Finished update of gh-pages"

  # Post a Slack message
  git checkout master
  echo "-- Deployed successfully, check out https://sebastienrousseau.co.uk"
}

push() {
  git push upstream gh-pages --force
  git checkout master
  echo "Deployed successfully, check out https://sebastienrousseau.co.uk"
  exit 0
}

setup
setup_git
commit
push

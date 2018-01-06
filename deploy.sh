#!/bin/bash

set -o errexit -o nounset

rev=$(git rev-parse --short HEAD)

echo "Starting deploy to http://sebastienrousseau.co.uk"

# Build the docs page locally
export JEKYLL_ENV="production"
bundle exec jekyll build

# Bots need names too
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
git remote add upstream "https://$GH_TOKEN@github.com/reedia/sebastienrousseau.co.uk.git"

#git pull
rm -rf *

# Copy the finished HTML pages to the current directory
cp -R /tmp/sebastienrousseau.co.uk/* .

# We need a CNAME file for GitHub
echo "sebastienrousseau.co.uk" > "CNAME"

# Commit all the changes and push it to the remote
git add -A
git commit -m "Deployed by Reedia Limited with $(jekyll -v)"
git push upstream gh-pages --force # force needed, as travis somehow can't re-use branches

# Post a Slack message
git checkout master

echo "Deployed successfully, check out http://sebastienrousseau.co.uk"
echo "If you're running this on your local machine, please make sure to reset your git user credentials (username and email) to not be the bot"

exit 0

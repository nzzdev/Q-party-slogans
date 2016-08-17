# NZZ Storytelling Q Party Slogans

## Development
Run `gulp watch` to get a webserver. Point your Browser to the URL given in the console.

## Travis Setup
  * Github Token for JSPM: https://gist.github.com/topheman/25241e48a1b4f91ec6d4
  * `travis encrypt JSPM_GITHUB_AUTH_TOKEN= --add`
  * `travis encrypt KEYCDN_API_KEY= --add`
  * `travis encrypt AWS_SECRET_ACCESS_KEY= --add`
  * `travis encrypt AWS_ACCESS_KEY_ID= --add`
  * `travis encrypt "nzz:token" --add notifications.slack`

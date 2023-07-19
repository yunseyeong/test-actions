module.exports = async ({github, context, versionType}) => {
  console.log(context)
  console.log(currentVersion, versionType)
  const response = await github.rest.repos.getLatestRelease({
    owner: context.repo.owner,
    repo: context.repo.repo,
  })
  console.log(response.data.name);
  const version = response.data.name.replace('v', '').split('.')
  let major = parseInt(version[0], 10)
  let minor = parseInt(version[1], 10)
  let patch = parseInt(version[2], 10)
  switch (versionType) {
    case 'patch': {
      patch++
      break
    }
    case 'minor': {
      patch = 0
      minor++
      break
    }
    case 'major': {
      patch = 0
      minor = 0
      major++
    }
  }
  const nextVersion = `v${major}.${minor}.${patch}`
  console.log('nextVersion = ', nextVersion);
  return nextVersion
}

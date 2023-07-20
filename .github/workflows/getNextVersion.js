module.exports = async ({github, context, versionType}) => {
  const releaseList = await github.rest.repos.getLatestRelease({
    owner: context.repo.owner,
    repo: context.repo.repo,
  })
  console.log('relaaseList!!!', releaseList.data)
  
  const response = await github.rest.repos.getLatestRelease({
    owner: context.repo.owner,
    repo: context.repo.repo,
  })
  const { name, id } = response.data
  console.log('currentVersion = ', name);
  const version = name.replace('v', '').split('.')
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
  const updateResponse = await github.rest.repos.updateRelease({
    owner: context.repo.owner,
    repo: context.repo.repo,
    release_id: id,
    name: nextVersion,
    draft: false,
  })
  console.log(updateResponse.data)
  return nextVersion
}

module.exports = async ({github, context, versionType}) => {
  const releases = await github.rest.repos.listReleases({
    owner: context.repo.owner,
    repo: context.repo.repo,
  })
  const draftRelease = releases.data.filter(_ => _.draft)[0]
  if (!draftRelease) {
    console.warn('There is nothing to release')
    return
  }
  const latestReleaseResponse = await github.rest.repos.getLatestRelease({
    owner: context.repo.owner,
    repo: context.repo.repo,
  })
  const { name } = latestReleaseResponse.data
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
    release_id: draftRelease.id,
    name: nextVersion,
    draft: false,
  })
  console.log(updateResponse)
  return nextVersion
}

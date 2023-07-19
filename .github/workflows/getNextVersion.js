module.exports = ({github, currentVersion, versionType}) => {
  console.log(github)
  console.log(currentVersion, versionType)
  const version = currentVersion.replace('v', '').split('.')
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
}

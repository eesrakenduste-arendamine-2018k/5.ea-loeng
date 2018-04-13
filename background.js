/* globals firebase */
chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({color: '#3aa757'}, function () {
    console.log('The color is green.')
  })

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'developer.chrome.com'}
      })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }])
  })
})

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    console.log(sender.tab
      ? 'from a content script:' + sender.tab.url
      : 'from the extension')

    if (request.type === 'click') {
      const id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0
        const v = c === 'x' ? r : (r & 0x3 | 0x8)

        return v.toString(16)
      })
      firebase.database().ref('clicks/' + id).set(request)
      sendResponse({message: 'saved'})
    }
  })

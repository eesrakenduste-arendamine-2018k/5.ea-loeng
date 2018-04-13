console.log('tere')

window.addEventListener('click', function (event) {
  console.log(event)

  chrome.runtime.sendMessage({
    type: 'click',
    date: new Date().getTime(),
    pageX: event.pageX,
    pageY: event.pageY
  }, function (response) {
    console.log(response.message)
  })
})

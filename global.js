const visit = (x) => {
  history.pushState({}, 'title', `/${x}`)
  location.reload()
}

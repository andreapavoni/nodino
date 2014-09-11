# @cjsx React.DOM

Shortener = React.createClass(
  getInitialState: ->
    data:
      url: null
      id: null
      host: null

  handleSubmit: (e) ->
    e.preventDefault()
    url = @refs.url.getDOMNode().value.trim()
    $.ajax
      type: "POST"
      data:
        url: url

      success: ((data) ->
        unless data.error
          that = this
          $(that.getDOMNode()).flip
            speed: 250
            dontChangeColor: true
            onBefore: ->
              that.setState data: data.data
              url = that.state.data.host + "/" + that.state.data.id
              that.refs.url.getDOMNode().value = url
            onEnd: ->
              $(that.refs.url.getDOMNode()).focus()
              $(that.refs.url.getDOMNode()).select()
        else
          $(@refs.notification.getDOMNode()).text data.error
      ).bind(this)

    return

  handleRevert: (e) ->
    e.preventDefault()
    that = this

    $(@getDOMNode()).flip
      speed: 250
      dontChangeColor: true
      onBefore: ->
        that.setState that.getInitialState()
        that.refs.url.getDOMNode().value = ""

  render: ->
    if (@state.data && @state.data.id)
      <form action="/" method='POST' className='shortener shortened' onSubmit={@handleRevert}>
        <input ref='url' className='shortener__url--output' type='text' disabled />
        <input type='submit' className='shortener__button--revert' value='New'/>
        <span ref='notification' className='shortener__notification'>Hit Ctrl/Cmd-C to copy to clipboard.</span>
      </form>
    else
      <form action='/' method='POST' className='shortener' onSubmit={@handleSubmit}>
        <input type='text' ref='url' name='url' placeholder='Enter a URL to shorten...' className='shortener__url--input'/>
        <input type='submit' className='shortener__button--submit' value='Go!'/>
        <span ref='notification' className='shortener__notification error'></span>
      </form>
)

React.renderComponent(
  <Shortener />,
  document.getElementById("app")
)

/**
 * @jsx React.DOM
 */

var Shortener = React.createClass({
  getInitialState: function() {
    return {data: {url: null, id: null, host: null}};
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var url = this.refs.url.getDOMNode().value.trim();

    $.ajax({
      type: 'POST',
      data: {url: url},

      success: function(data) {
        if (!data.error) {
          var that = this;

          $(that.getDOMNode()).flip({
            speed: 250,
            dontChangeColor: true,

            onBefore: function() {
              that.setState({data: data.data});
              var url = that.state.data.host + '/' + that.state.data.id;
              that.refs.url.getDOMNode().value = url;
            },
            onEnd: function() {
              $(that.refs.url.getDOMNode()).focus();
              $(that.refs.url.getDOMNode()).select();
            }
          });
        } else {
          $(this.refs.notification.getDOMNode()).text(data.error);
        }
      }.bind(this)
    });
  },

  handleRevert: function(e) {
    e.preventDefault();
    var that = this;

    $(this.getDOMNode()).flip({
      speed: 250,
      dontChangeColor: true,
      onBefore: function() {
        that.setState(that.getInitialState());
        that.refs.url.getDOMNode().value = '';
      }
    });
  },

  render: function() {
    if(this.state.data && this.state.data.id) {
      return (
        <form action="/" method='POST' className='shortener shortened' onSubmit={this.handleRevert}>
          <input ref='url' className='shortener__url--output' type='text' disabled />
          <input type='submit' className='shortener__button--revert' value='New'/>
          <span ref='notification' className='shortener__notification'>Hit Ctrl/Cmd-C to copy to clipboard.</span>
        </form>
      );
    } else {
      return (
        <form action='/' method='POST' className='shortener' onSubmit={this.handleSubmit}>
          <input type='text' ref='url' name='url' placeholder='Enter a URL to shorten...' className='shortener__url--input'/>
          <input type='submit' className='shortener__button--submit' value='Go!'/>
          <span ref='notification' className='shortener__notification error'></span>
        </form>
      );
    }

  }
});

React.renderComponent(
  <Shortener />,
  document.getElementById('app')
);

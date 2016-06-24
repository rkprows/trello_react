class Board extends React.Component {
	constructor(props) {
		super(props);
    this.state = { editing: false };
    this.updateBoard = this.updateBoard.bind(this);

	}

  toggleEdit() {
    this.setState({ editing: !this.state.editing})
  }

  updateBoard(){
  	let board = { name: this.refs.name.value, description: this.refs.description.value }
  	this.toggleEdit();
  	this.props.updateBoard(this.props.id, board);
  }

	render() {
    let info;
    if (this.state.editing) {
      info = 
        <form ref='addForm'>
          <input type='text' placeholder={this.props.name} defaultValue={this.props.name} ref='name' required />
          <textarea placeholder={this.props.description} defaultValue={this.props.description} ref='description'></textarea>
          <input type='submit' className='btn' onClick={this.updateBoard}/>
        </form>
    } else {
      info =    
        <div> 
          <span className="card-title">{this.props.name}</span>
          <p>{this.props.description}</p>
        </div>
    }

		return(
			<div className='container'>
        <div className="col s12 m6">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
            {info}
            </div>
            <div className="card-action">
              <button className='btn' onClick={ this.toggleEdit.bind(this) }>Edit</button>
              <button className='btn' onClick={() => this.props.showBoard(this.props)}>Show</button>
              <button className='btn red' onClick={() => this.props.deleteBoard(this.props.id)}>Delete</button>
            </div>
          </div>
        </div>
      </div>
		)
	}
}
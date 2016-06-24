class List extends React.Component {
	constructor(props) {
		super(props);
		this.state = { items: [] };
		this.deleteItem = this.deleteItem.bind(this);
	}

	componentWillMount() {
		$.ajax ({
			url: '/items',
			type: 'GET',
			data: {list_id: this.props.id },
			dataType: 'JSON'
		}).done( items => {
			this.setState({ items });
		}).fail( data => {
			alert('Failed grabbing list items.');
		});
	}
	
	addItem(e) {
		e.preventDefault();
		$.ajax({
			url:'/items',
			type: 'POST',
			data: { list_id: this.props.id, item: { name: this.refs.name.value} },
			dataType: 'JSON'
		}).done( item => {
			this.refs.addItem.reset();
			this.setState({ items: [{...item}, ...this.state.items ] });
		}).fail( data => {
			alert('Item not saved.');
		});
	}

	deleteItem(id) {
		$.ajax({
			url:`/items/${id}`,
			type: 'DELETE',
			data: {list_id: this.props.id},
			dataType: 'JSON'
		}).done( item => {
			let items = this.state.items;
			let index = items.findIndex( i => i.id === id);
			this.setState({
				items: [ ...items.slice(0, index), ...items.slice(index + 1, items.length) ]
			});
		}).fail( item => {
			alert('item was not deleted!');
		});
	}

	render() {
		let items = this.state.items.map( item => {
			// TODO: This should be a new Item component
			return(<Item key={`item-${item.id}`} {...item} deleteItem={this.deleteItem} addItem={this.addItem}/>);
		});
		return(
			<div>
        <div className="col s12 m6">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">{this.props.name}</span>
            	<form onSubmit={this.addItem.bind(this)} ref='addItem'>
			  				<input type='text' ref='name' placeholder='Task Name' required />
			  				<input type='submit' className='btn-small grey' value='Add Task' />
			  			</form>
			  			<br />
			  			{items}
			  		</div>
            <div className="card-action">
              <button className='btn' onClick={() => this.props.editList(this.props.id)}>Edit List</button>
              <button className='btn red' onClick={() => this.props.deleteList(this.props.id)}>Delete List</button>
            </div>
          </div>
			  </div>
			</div>
		);
	}
}


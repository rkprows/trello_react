class Item extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div className="row">
				<div style={{ cursor: 'pointer' }} className="col m1 red" onClick={() => this.props.deleteItem(this.props.id)}>
					x
				</div>
				<p className="col m3">{this.props.name}</p>
			</div>
		)
	}
}
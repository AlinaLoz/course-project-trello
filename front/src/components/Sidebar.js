import React from 'react';
import {Icon, Segment, Sidebar, Menu} from "semantic-ui-react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {logOut} from "../redux/auth/actions";

const NavbarComponent = ({history, onlogOut}) => {
	return (
		<Sidebar visible className={'page-tasks__sidebar navbar'}>
			<Segment basic>
				<Menu.Item as={'a'} onClick={() => history.push('/about')}>
					<span>LozitaTododer</span>
					<Icon name={`log out`} onClick={() => onlogOut()}/>
				</Menu.Item>
				<Menu.Item as={'a'} onClick={() => history.push('/teams')}>
					<Icon name='group'/>
					<span>Команды</span>
				</Menu.Item>
				<Menu.Item as={'a'} onClick={() => history.push('/boards')}>
					<Icon name='clipboard'/>
					<span>Доски</span>
				</Menu.Item>
				<Menu.Item as={'a'} onClick={() => history.push('/history')}>
					<Icon name='history'/>
					<span>История событий</span>
				</Menu.Item>
				<Menu.Item as={'a'} onClick={() => history.push('/about')}>
					<Icon name='question circle'/>
					<span>О приложении</span>
				</Menu.Item>
			</Segment>
		</Sidebar>
	)
};


export default withRouter(connect(
	state => ({}),
	dispatch => ({
		onlogOut: () => dispatch(logOut())
	}),
)(NavbarComponent));
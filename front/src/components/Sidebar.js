import React from 'react';
import {Icon, Segment, Sidebar, Menu} from "semantic-ui-react";

const NavbarComponent = ({history, onlogOut, login, role}) => {
	return (
		<Sidebar visible className={'page-tasks__sidebar navbar'}>
			<Segment basic>
				<Menu.Item as={'a'} onClick={() => history.push('/about')}>
					<span className={'name-user'}>{login}</span>
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
				{role === 'admin' && (
					<Menu.Item as={'a'} onClick={() => history.push('/list-users')}>
						<Icon name='child'/>
						<span>Пользователи</span>
					</Menu.Item>
				)}
				{/*<Menu.Item as={'a'} onClick={() => history.push('/about')}>*/}
				{/*	<Icon name='question circle'/>*/}
				{/*	<span>О приложении</span>*/}
				{/*</Menu.Item>*/}
			</Segment>
		</Sidebar>
	)
};

export default NavbarComponent;


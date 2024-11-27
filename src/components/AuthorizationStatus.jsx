import Header from './Header'
import BarCode from './BarCode'
import QrCode from './QrCode'

import masterCard from '../assets/images/mastercard.png'

const AuthorizationStatus = ({ item }) => {
	return (
		<div
			style={{
				width: '100%',
				maxWidth: 595,
				minHeight: 842,
				padding: 16,
				backgroundColor: '#3f51b5',
			}}
		>
			<Header />
			<br />
			<div
				style={{
					position: 'relative',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<p
					style={{
						minWidth: 200,
						minHeight: 2,
						borderBottom: '2px solid white',
						fontSize: 18,
						fontWeight: 500,
						color: 'white',
						textAlign: 'center',
						letterSpacing: 0.85,
					}}
				/>
				<br />
				<br />
				<br />
				<br />
				<p
					style={{
						width: 500,
						minHeight: 2,
						marginTop: 10,
						borderBottom: '2px solid white',
						fontSize: 18,
						fontWeight: 500,
						color: 'white',
						textAlign: 'center',
						letterSpacing: 0.85,
					}}
				/>
				<img
					src={masterCard}
					alt='mastercard'
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: 150,
					}}
				/>
				<br />
				<br />
				<p
					style={{
						fontSize: 18,
						fontWeight: 500,
						color: 'white',
						textAlign: 'center',
						letterSpacing: 0.85,
					}}
				>
					AUTHORIZATION STATUS:
				</p>
				<p
					style={{
						marginTop: 6,
						fontSize: 18,
						fontWeight: 500,
						color: 'white',
						textAlign: 'center',
						letterSpacing: 0.85,
					}}
				>
					ACTIVE
				</p>
				<p
					style={{
						minWidth: 300,
						minHeight: 2,
						marginTop: 6,
						padding: 6,
						borderBottom: '2px solid white',
						fontSize: 18,
						fontWeight: 500,
						color: 'white',
						textAlign: 'center',
						letterSpacing: 0.85,
					}}
				>
					{item.cardNumber.replaceAll(' ', '')}
				</p>
				<br />
				<p
					style={{
						fontSize: 13,
						fontWeight: 500,
						color: 'white',
						textAlign: 'center',
						letterSpacing: 0.85,
					}}
				>
					Authorization Code
				</p>
				<p
					style={{
						minWidth: 300,
						minHeight: 2,
						marginTop: 6,
						padding: 6,
						borderBottom: '2px solid white',
						fontSize: 13,
						fontWeight: 500,
						color: 'white',
						textAlign: 'center',
						letterSpacing: 0.85,
					}}
				>
					Protocol {item.protocol}
				</p>
				<p
					style={{
						marginTop: 4,
						fontSize: 13,
						fontWeight: 500,
						color: '#4caf50',
						textAlign: 'center',
						letterSpacing: 0.85,
					}}
				>
					{item.authorizationCode}
				</p>
				<p
					style={{
						marginTop: 10,
						fontSize: 13,
						fontWeight: 500,
						fontStyle: 'italic',
						color: 'white',
						textAlign: 'center',
						letterSpacing: 0.85,
					}}
				>
					Active Authorization Code only for the Amount
				</p>
				<br />
				<BarCode data={item.barCode} />
				<br />
				<br />
				<QrCode
					data={item.referenceNumber}
					styles={{
						right: 70,
						width: 90,
					}}
				/>
				<br />
				<br />
				<p
					style={{
						fontSize: 13,
						fontWeight: 500,
						fontStyle: 'italic',
						color: 'white',
						textAlign: 'center',
						letterSpacing: 0.85,
					}}
				>
					{'SYSTEM DEPARTMENT/ACCESS/VIS91**67248***/***301286 SYSTEM SCREEN'}
				</p>
			</div>
		</div>
	)
}

export default AuthorizationStatus

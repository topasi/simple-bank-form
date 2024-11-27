import Header from './Header'
import BarCode from './BarCode'

import masterCard from '../assets/images/mastercard.png'

const CardInformation = ({ item }) => {
	return (
		<div
			style={{
				width: '100%',
				maxWidth: 595,
				minHeight: 842,
				padding: 16,
				backgroundColor: '#242424',
			}}
		>
			<Header />
			<div className='title-container'>
				<span className='title-dots'></span>
				<span className='title-text'>CARD INFORMATION</span>
				<span className='title-dots'></span>
			</div>
			<p
				style={{
					marginTop: 4,
					fontSize: 13,
					fontWeight: 500,
					color: '#651fff',
					textAlign: 'center',
					letterSpacing: 0.85,
				}}
			>
				DATA VERIFIED BY
			</p>
			<img
				src={masterCard}
				alt='mastercard'
				style={{
					width: 50,
					display: 'table',
					margin: '4px auto',
				}}
			/>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
				}}
			>
				<table
					cellSpacing={0}
					cellPadding={0}
					style={{
						marginLeft: 'auto',
						marginRight: 'auto',
					}}
				>
					<tr>
						<td>
							<p
								style={{
									fontSize: 14,
									fontWeight: 500,
									color: 'white',
									textAlign: 'center',
									letterSpacing: 0.85,
								}}
							>
								Receiver/Card Holder Name:
							</p>
						</td>
					</tr>
					<tr>
						<td>
							<div
								style={{
									minWidth: 400,
									height: 26,
									paddingLeft: 10,
									paddingRight: 10,
									backgroundColor: '#3d5afe',
									overflow: 'hidden',
									fontSize: 14,
									fontWeight: 500,
									color: 'white',
									textAlign: 'center',
									lineHeight: '26px',
									letterSpacing: 0.85,
								}}
							>
								{item.cardHolderName}
							</div>
						</td>
					</tr>
					<tr>
						<td>
							<p
								style={{
									fontSize: 14,
									fontWeight: 500,
									color: 'white',
									textAlign: 'center',
									letterSpacing: 0.85,
								}}
							>
								Receiver/Issuing Bank:
							</p>
						</td>
					</tr>
					<tr>
						<td>
							<div
								style={{
									minWidth: 400,
									height: 26,
									paddingLeft: 10,
									paddingRight: 10,
									backgroundColor: '#3d5afe',
									overflow: 'hidden',
									fontSize: 14,
									fontWeight: 500,
									color: 'white',
									textAlign: 'center',
									lineHeight: '26px',
									letterSpacing: 0.85,
								}}
							>
								{item.issuingBank}
							</div>
						</td>
					</tr>
					<tr>
						<td>
							<p
								style={{
									fontSize: 14,
									fontWeight: 500,
									color: 'white',
									textAlign: 'center',
									letterSpacing: 0.85,
								}}
							>
								Receiver/Card Number:
							</p>
						</td>
					</tr>
					<tr>
						<td>
							<div
								style={{
									minWidth: 400,
									height: 26,
									paddingLeft: 10,
									paddingRight: 10,
									backgroundColor: '#3d5afe',
									overflow: 'hidden',
									fontSize: 14,
									fontWeight: 500,
									color: 'white',
									textAlign: 'center',
									lineHeight: '26px',
									letterSpacing: 0.85,
								}}
							>
								{item.cardNumber.replaceAll(' ', '')}
							</div>
						</td>
					</tr>
					<tr>
						<td>
							<p
								style={{
									fontSize: 14,
									fontWeight: 500,
									color: 'white',
									textAlign: 'center',
									letterSpacing: 0.85,
								}}
							>
								Receiver/Expiration Date:
							</p>
						</td>
					</tr>
					<tr>
						<td>
							<div
								style={{
									minWidth: 400,
									height: 26,
									paddingLeft: 10,
									paddingRight: 10,
									backgroundColor: '#3d5afe',
									overflow: 'hidden',
									fontSize: 14,
									fontWeight: 500,
									color: 'white',
									textAlign: 'center',
									lineHeight: '26px',
									letterSpacing: 0.85,
								}}
							>
								{item.expirationDate}
							</div>
						</td>
					</tr>
					<tr>
						<td>
							<p
								style={{
									fontSize: 14,
									fontWeight: 500,
									color: 'white',
									textAlign: 'center',
									letterSpacing: 0.85,
								}}
							>
								Receiver/Amount:
							</p>
						</td>
					</tr>
					<tr>
						<td>
							<div
								style={{
									minWidth: 400,
									height: 26,
									paddingLeft: 10,
									paddingRight: 10,
									backgroundColor: '#3d5afe',
									overflow: 'hidden',
									fontSize: 14,
									fontWeight: 500,
									color: 'white',
									textAlign: 'center',
									lineHeight: '26px',
									letterSpacing: 0.85,
								}}
							>
								{item.amount.replace('$', '')}
							</div>
						</td>
					</tr>
				</table>
			</div>
			<BarCode data={item.barCode} />
			<div
				className='title-container'
				style={{
					marginTop: 16,
				}}
			>
				<span className='title-dots'></span>
				<span className='title-text'>ACTIVATING TRANSACTION</span>
				<span className='title-dots'></span>
			</div>
			<div
				style={{
					position: 'relative',
					marginTop: 16,
					marginBottom: 8,
					lineHeight: 1.6,
				}}
			>
				<div className='status-container'>
					<span className='status-message'>Redirecting to Visa Network:</span>
					<span className='status-dots'></span>
					<span className='status-result'>OK</span>
				</div>
				<div className='status-container'>
					<span className='status-message'>Connecting to Database:</span>
					<span className='status-dots'></span>
					<span className='status-result'>CONNECTED</span>
				</div>
				<div className='status-container'>
					<span className='status-message'>Account Verification:</span>
					<span className='status-dots'></span>
					<span className='status-result'>OK</span>
				</div>
				<div className='status-container'>
					<span className='status-message'>Approval Code:</span>
					<span className='status-dots'></span>
					<span className='status-result'>{item.codeActivated}</span>
				</div>
				<div className='status-container'>
					<span className='status-message'>Account Type:</span>
					<span className='status-dots'></span>
					<span className='status-result'></span>
				</div>
				<div className='status-container'>
					<span className='status-message'>Transaction Status:</span>
					<span className='status-dots'></span>
					<span
						className='status-result'
						style={{
							color: '#4caf50',
						}}
					>
						ACTIVE
					</span>
				</div>
				<div className='status-container'>
					<span className='status-message'>Authorization Code:</span>
					<span className='status-dots'></span>
					<span className='status-result'>{item.authorizationCode}</span>
				</div>
				<div className='status-container'>
					<span className='status-message'>Authorization Amount:</span>
					<span className='status-dots'></span>
					<span className='status-result'>{item.amount.replace('$', '')} #USD#</span>
				</div>
				<div className='status-container'>
					<span className='status-message'>Protocol:</span>
					<span className='status-dots'></span>
					<span className='status-result'>{item.protocol}</span>
				</div>
			</div>
			<div
				style={{
					width: '100%',
					height: 3,
					borderBottom: '3px dashed #00b0ff',
				}}
			/>
			<div
				className='title-container'
				style={{
					marginTop: 8,
				}}
			>
				<span className='title-dots'></span>
				<span className='title-text'>TRANSACTION INDEX</span>
				<span className='title-dots'></span>
			</div>
			<div
				style={{
					position: 'relative',
					marginBottom: 10,
					lineHeight: 1.6,
				}}
			>
				<div className='status-container'>
					<span className='status-message'>Linked Code Number:</span>
					<span className='status-dots'></span>
					<span className='status-result'></span>
				</div>
				<div className='status-container'>
					<span className='status-message'>Card Number XXXX</span>
					<span className='status-dots'></span>
					<span
						className='status-result'
						style={{
							color: '#4caf50',
						}}
					>
						LINKED
					</span>
				</div>
				<div className='status-container'>
					<span className='status-message'>Approved Amount:</span>
					<span className='status-dots'></span>
					<span
						className='status-result'
						style={{
							color: '#4caf50',
						}}
					>
						CONNECTED
					</span>
				</div>
			</div>
			<BarCode data={item.barCode} />
		</div>
	)
}

export default CardInformation

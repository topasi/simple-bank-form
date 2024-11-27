import moment from 'moment-timezone'

import Header from './Header'
import BarCode from './BarCode'
import QrCode from './QrCode'

import masterCard from '../assets/images/mastercard.png'

const ActivatingTransaction = ({ item }) => {
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
			<br />
			<div
				style={{
					width: '100%',
					height: 3,
					borderBottom: '3px dashed #00b0ff',
				}}
			/>
			<img
				src={masterCard}
				alt='mastercard'
				style={{
					width: 125,
					display: 'table',
					margin: '12px auto 0',
				}}
			/>
			<div className='title-container'>
				<span className='title-dots size-15'></span>
				<span className='title-text size-15'>ACTIVATING TRANSACTION</span>
				<span className='title-dots size-15'></span>
			</div>
			<br />
			<p
				style={{
					fontSize: 13,
					fontWeight: 500,
					fontStyle: 'italic',
					color: 'white',
					letterSpacing: 0.85,
				}}
			>
				Your wallet will be effective from this moment; Provided that the authorization
				<br />
				codes are linked to the bank concentrator account that allocated the funds to carry
				<br />
				out the wallet load that will be rejected at the moment the authorization is
				<br />
				activated.
				<br />
				Remembering to keep funds available of 200 dollars from the date of execution of
				<br />
				load that all transaction will be verified of the server and recharge system.
			</p>
			<br />
			<BarCode data={item.barCode} />
			<br />
			<div
				style={{
					position: 'relative',
				}}
			>
				<p
					style={{
						fontSize: 14,
						fontWeight: 500,
						lineHeight: 1.75,
						color: 'white',
						letterSpacing: 0.85,
					}}
				>
					AMOUNT: {item.amount.replace('$', '')}#USD#
					<br />
					TERMINATION CARD:{' '}
					{item.cardNumber
						?.split(' ')
						?.map((d, i) => (i < 3 ? d.replace(/\d/g, 'X') : d))
						?.join(' ')}
					<br />
					MADE ON {moment(item.madeOn, 'YYYY/MM/DD HH:mm:ss').format('YYYY/MM/DD, HH:mm:ss')} CST
					<br />
					REFERENCE NUMBER: {item.referenceNumber}
					<br />
					CODE ACTIVATED: {item.codeActivated}
				</p>
				<QrCode
					data={item.referenceNumber}
					styles={{
						position: 'absolute',
						top: 10,
						right: 70,
						width: 90,
					}}
				/>
				<br />
				<p
					style={{
						fontSize: 13,
						fontWeight: 500,
						fontStyle: 'italic',
						color: 'white',
						letterSpacing: 0.85,
					}}
				>
					This file is not a receipt or proof of payment, we recommend that you save this file
					<br />
					to use as reference incase of possible clarification. Visa Corporation cargo service
					<br />
					is operated by HSBC GERMANNY https://usa.mastercard.com/30VM12L86-E7A-SEMP-
					<br />
					ZOE
				</p>
				<br />
				<BarCode data={item.barCode} />
				<br />
				<p
					style={{
						fontSize: 14,
						fontWeight: 500,
						color: 'green',
						textAlign: 'center',
						letterSpacing: 0.85,
					}}
				>
					{item.authorizationCode}
				</p>
				<p
					style={{
						marginTop: 4,
						fontSize: 14,
						fontWeight: 500,
						color: 'white',
						textAlign: 'center',
						letterSpacing: 0.85,
					}}
				>
					Protocol DTC/{item.protocol}
				</p>
			</div>
		</div>
	)
}

export default ActivatingTransaction

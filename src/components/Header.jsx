const Header = () => {
	return (
		<div style={{}}>
			<p
				style={{
					fontSize: 13,
					fontWeight: 500,
					textAlign: 'right',
					color: 'white',
					letterSpacing: 0.85,
				}}
			>
				<span
					style={{
						color: '#4caf50',
					}}
				>
					{'TRACK1_DATA: '}
				</span>
				{'SEARCH_FOR_CC_DATA+LO QUANTUM 7.5'}
				<br />
				{'((B|B))[13.19]/<(A_ZA_A/S)(201/101))____/EMV/D2/COMPLETE'}
				<br />
				<span
					style={{
						color: '#4caf50',
					}}
				>
					{'TRACK2_DATA: '}
				</span>
				{'OPEN PROCESS_ACCESS SYSTEM_AND_READ_VERIFY?MEM+149-'}
			</p>
			<p
				style={{
					marginTop: 10,
					fontSize: 13,
					fontWeight: 500,
					textAlign: 'right',
					color: 'white',
					letterSpacing: 0.85,
				}}
			>
				<span
					style={{
						color: '#4caf50',
					}}
				>
					{'TRACK3_DATA: '}
				</span>
				{'VERIFY_EXIT'}
			</p>
		</div>
	)
}

export default Header

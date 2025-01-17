import React from 'react'
import {Box, Center, Divider, HStack, Icon, Text, VStack} from 'native-base';
import {MaterialIcons} from "@expo/vector-icons";
import moment from "moment";

// custom components and helper files
import {translate} from '../../util/translations';

const HoursAndLocation = (props) => {

	const {hoursMessage, hours, description} = props

	return (
		<>
			<Box mb={4}>
				<Center>
					<HStack space={3} alignItems="center">
						<Icon as={MaterialIcons} name="schedule" size="sm" mt={0.3} mr={-1}/>
						<Text fontSize="lg" bold>{translate('library_contact.today_hours')}</Text>
						<Text>{description}</Text>
					</HStack>
					<Text alignText="center" mt={2} italic>{hoursMessage}</Text>
				</Center>
			</Box>
			<Divider mb={10}/>
		</>
	)
}

function renderHours(item) {
	let hours;
	const openTime = moment(item.open, "HH:mm").format("h:mm A");
	const closingTime = moment(item.close, "HH:mm").format("h:mm A");

	if (item.isClosed) {
		hours = translate('library_contact.closed');
	} else {
		hours = openTime + " - " + closingTime;
	}

	return (
		<Box>
			<Center>
				<VStack space={1} alignItems="flex-start">
					<Text bold fontSize="sm">{item.dayName}</Text>
					<Text fontSize="sm">{hours}</Text>
				</VStack>
			</Center>
			{item.notes ?
				<Text bold>{translate('library_contact.note')}: <Text>{item.notes}</Text></Text>
				: null}
		</Box>
	);
}

export default HoursAndLocation;
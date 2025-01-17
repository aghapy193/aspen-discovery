import React, {Component} from "react";
import {Box, Button, Center, FlatList, FormControl, Input, Text} from "native-base";

// custom components and helper files
import {translate} from '../../util/translations';
import {loadingSpinner} from "../../components/loadingSpinner";

export default class Search extends Component {
	constructor() {
		super();
		this.state = {
			isLoading: true,
			searchTerm: "",
			defaultSearches: [
				{
					key: 0,
					label: "New York Times",
					term: "new york times",
				},
				{
					key: 1,
					label: "Autobiography",
					term: "autobiography",
				},
				{
					key: 2,
					label: "Super Heroes",
					term: "super hero",
				},
				{
					key: 3,
					label: "US History",
					term: "us history",
				},
			]
		};
	}

	componentDidMount = async () => {
		this.setState({isLoading: false});
	};

	initiateSearch = async () => {
		const {searchTerm} = this.state;
		this.props.navigation.navigate("SearchResults", {
			searchTerm: searchTerm
		});
	};

	renderItem = (item) => {
		const {navigate} = this.props.navigation;
		return (
			<Button
				mb={3}
				onPress={() =>
					navigate("SearchResults", {
						searchTerm: item.term,
					})
				}
			>
				{item.label}
			</Button>
		);
	};

	clearText = () => {
		this.setState({searchTerm: ""});
	};

	render() {
		if (this.state.isLoading) {
			return (loadingSpinner());
		}

		return (
			<Box safeArea={5}>
				<FormControl>
					<Input
						variant="filled"
						autoCapitalize="none"
						onChangeText={(searchTerm) => this.setState({searchTerm})}
						status="info"
						placeholder={translate('search.title')}
						clearButtonMode="always"
						onSubmitEditing={this.initiateSearch}
						value={this.state.searchTerm}
						size="xl"
					/>
					<Center>
						<Text mt={8} mb={2} fontSize="xl" bold>
							{translate('search.quick_search_title')}
						</Text>
					</Center>
				</FormControl>
				<FlatList
					data={this.state.defaultSearches}
					renderItem={({item}) => this.renderItem(item)}
				/>
			</Box>
		);
	}
}
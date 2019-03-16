import * as React from "react";
import {Avatar, Button, Card, CardContent, CardHeader, Chip, Divider, Typography} from "@material-ui/core";

const BasicInfoCard = ({dataset}) => {
  const renderSearchTerms = (terms: any[]) => {
    if(!terms) {
      return;
    }
    return terms.map((term) => (
        <Chip label={term}></Chip>
    ));
  };

  const renderPrice = (price: number) => {
    if(!price) {
      return;
    }
    return `$${price.toFixed(2)}`
  };

  return(
    <Card>
      <CardHeader
        title={dataset.name}
        subheader={dataset.description}
        avatar={<Avatar> R</Avatar>}
      ></CardHeader>
      <CardContent>
        <Typography className={"card-content-title"}>Dataset Information</Typography>
        <Typography className={"card-content-sub-title"}>Delivery Method</Typography>
        <Typography className={"card-content-sub-desc"}>{dataset['delivery_method']}</Typography>
        <Divider/>
        <Typography className={"card-content-sub-title"}>Tags</Typography>
        <Typography className={"card-content-sub-desc"}>
          {renderSearchTerms(dataset['search_terms'])}
        </Typography>
        <Divider/>
        <Typography className={"card-content-sub-title"}>Location</Typography>
        <Typography className={"card-content-sub-desc"}>{dataset['country']}, {dataset['state_province']}</Typography>
        <Divider/>
        <Typography className={"card-content-sub-title"}>Total Records</Typography>
        <Typography className={"card-content-sub-desc"}>{dataset['num_of_records']}</Typography>
        <Divider/>
        <Typography className={"card-content-price"}> {renderPrice(dataset['price_high'])}</Typography>
        <Button color={"secondary"} variant={"contained"} className={"dataset-buy"}>
          Buy
        </Button>
      </CardContent>
    </Card>
  );
};

export default BasicInfoCard;

import React, { Component } from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle
} from 'reactstrap';

class DishDetail extends Component {


    renderDish(dish) {
        if (dish != null) {
            return (
                <Card key={dish.id}>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        } else {
            return (
                <div></div>
            );
        }
    }

    renderComments(dish) {
        const months = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ]
        if (dish != null) {
            if (dish.comments != null) {
                const foodComments =
                    dish.comments.map(singlecomment => {
                        return (
                            <div key={singlecomment.id}>
                                <ul className="list-unstyled">
                                    <li>
                                        <p>{singlecomment.comment}</p>
                                        {console.log(singlecomment.author)}
                                        <p>-- {singlecomment.author}, {months[new Date(singlecomment.date).getMonth()]} {new Date(singlecomment.date).getDate()}, {new Date(singlecomment.date).getFullYear()}</p>
                                    </li>
                                </ul>
                            </div>
                        );
                    });

                return (
                    <div>
                        <h4>Comments</h4>
                        {foodComments}
                    </div>
                )

            } else {
                return (
                    <div></div>
                )
            }
        } else {
            return (
                <div></div>
            )
        }

    }
    render() {
        return (
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    {this.renderDish(this.props.selectedDish)}
                </div>
                <div className="col-12 col-md-5 m-1">
                    {this.renderComments(this.props.selectedDish)}
                </div>
            </div>
        )
    }
}


export default DishDetail
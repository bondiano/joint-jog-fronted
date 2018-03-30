import React from 'react';
import PropTypes from 'prop-types'
import { Typography, Card, withStyles, CardContent, CardActions, CardHeader, Avatar, IconButton } from 'material-ui';

import { ProfileStyles } from './ProfileStyles';
import {vk, tw, fb, setIcon} from '../assets';

const socialNetworks = {
    vk: (url) => <a href={url}><img src={vk} alt="vk"/></a>,
    facebook: (url) => <a href={url}><img src={fb} alt="fb"/></a>,
    twitter: (url) => <a href={url}><img src={tw} alt="tw"/></a>
};

class ProfileInfo extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        isSending: PropTypes.bool.isRequired,
        data: PropTypes.object.isRequired,
        isCurrentUser: PropTypes.bool.isRequired,
        changeFormType: PropTypes.func
    };

    render() {
        const {classes} = this.props;
        console.log(this.props.data);
        return (
            <Card className={classes.rootInfo}>
                <CardHeader
                    avatar={
                        <Avatar>
                            {!!this.props.data.firstName && this.props.data.firstName.charAt(0)}
                        </Avatar>
                    }
                    action={
                        <IconButton className={classes.icon} onClick={this.props.changeFormType}>
                            <img src={setIcon} alt="Edit" />
                        </IconButton>
                    }
                    title={`${!!this.props.data.firstName ? this.props.data.firstName : ''} ${!!this.props.data.lastName ? this.props.data.lastName : ''}`}
                    subheader={this.props.data.username}
                />
                <CardContent>
                    {this.props.data.age && <Typography><b>Возраст:</b> {this.props.data.age}</Typography>}
                    {this.props.data.sex === 'female' && <Typography><b>Пол:</b> женский</Typography>}
                    {this.props.data.sex === 'male' && <Typography><b>Пол:</b> мужской</Typography>}
                </CardContent>
                <CardActions disableActionSpacing>
                    <div>
                        {/*{!this.props.isSending && this.props.data.socialNetworks && (() => this.props.data.socialNetworks.map((sc) => socialNetworks[sc.type](sc.url)))}*/}
                    </div>
                </CardActions>



            </Card>
        );
    }
}


export default withStyles(ProfileStyles)(ProfileInfo);



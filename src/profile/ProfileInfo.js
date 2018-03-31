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
        return (
            <Card className={classes.rootInfo}>
                <CardHeader
                    avatar={
                        <Avatar>
                            {this.props.data.username && this.props.data.username.charAt(0)}
                        </Avatar>
                    }
                    action={
                        this.props.isCurrentUser &&
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
                    <div>
                    </div>
                </CardContent>
                <CardActions disableActionSpacing>
                    <div>
                        {this.props.data.socialNetworks &&
                        (this.props.data.socialNetworks.find(sc => sc.type === 'vk')) &&
                        <a href={(this.props.data.socialNetworks.find(sc => sc.type === 'vk')).url}>
                            <img width="32" src={vk} alt="vk"/>
                        </a>}

                    </div>
                    <div>
                        {this.props.data.socialNetworks &&
                        (this.props.data.socialNetworks.find(sc => sc.type === 'facebook')) &&
                        <a href={(this.props.data.socialNetworks.find(sc => sc.type === 'facebook')).url}>
                            <img width="32" src={fb} alt="facebook"/>
                        </a>}
                    </div>
                    <div>
                        {this.props.data.socialNetworks &&
                        (this.props.data.socialNetworks.find(sc => sc.type === 'twitter')) &&
                        <a href={(this.props.data.socialNetworks.find(sc => sc.type === 'twitter')).url}>
                            <img width="32" src={tw} alt="vk"/>
                        </a>}
                    </div>
                </CardActions>



            </Card>
        );
    }
}


export default withStyles(ProfileStyles)(ProfileInfo);



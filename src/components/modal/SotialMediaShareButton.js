import React from "react";
import "./socialbutton.css";
import TwitterIcon from "image/Twitter.png";
import FacebookIcon from "image/Facebook.png";
import TumblrIcon from "image/Tumblr.png";
import PinterestIcon from "image/Pinterest.png";
import RedditIcon from "image/Reddit.png";
import LinkedInIcon from "image/LinkedIn.png";

export const SocialMediaButtons = [
    {
        name: "twitter",
        image: TwitterIcon,
        url:
            "https://twitter.com/intent/tweet?source=https%3A%2F%2Fwww.koreanolympiadquiz.com%2F&text=Korean%20Culture%20Quiz%20Olympiad:%20https%3A%2F%2Fwww.koreanolympiadquiz.com%2F",
    },

    {
        name: "facebook",
        image: FacebookIcon,
        url:
            "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.koreanolympiadquiz.com%2F&quote=Korean%20Culture%20Quiz%20Olympiad",
    },

    {
        name: "tumblr",
        image: TumblrIcon,
        url:
            "http://www.tumblr.com/share?v=3&u=https%3A%2F%2Fwww.koreanolympiadquiz.com%2F&quote=Korean%20Culture%20Quiz%20Olympiad&s=",
    },
    {
        name: "pinterest",
        image: PinterestIcon,
        url:
            "http://pinterest.com/pin/create/button/?url=https%3A%2F%2Fwww.koreanolympiadquiz.com%2F&description=Are%20you%20interested%20in%20Korea%3F%20Answer%2020%20questions%20to%20get%20a%20chance%20to%20go%20Korea!",
    },
    {
        name: "reddit",
        image: RedditIcon,
        url:
            "http://www.reddit.com/submit?url=https%3A%2F%2Fwww.koreanolympiadquiz.com%2F&title=Korean%20Culture%20Quiz%20Olympiad",
    },
    {
        name: "linked",
        image: LinkedInIcon,
        url:
            "http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fwww.koreanolympiadquiz.com%2F&title=Korean%20Culture%20Quiz%20Olympiad&summary=Are%20you%20interested%20in%20Korea%3F%20Answer%2020%20questions%20to%20get%20a%20chance%20to%20go%20Korea!&source=https%3A%2F%2Fwww.koreanolympiadquiz.com%2F",
    },
];

import React, {useEffect} from 'react'
import './aboutPage.css'
import TeamImg from '../../../components/teamImg/TeamImg'
import Accordion from '../../../components/accordionItem/accordion'
import {StyledContainer_v2
} from '../../../components/Styles'

import {useToastContext} from '../../../context/ToastContext'
export default function About() {
  const {addToast} = useToastContext();
  useEffect(()=>{
  addToast(`This page isn't working please don't try to use it <3`)
  },[])
  return (
    <StyledContainer_v2>
    <h1> WE SIMPLY CONNECT YOUR DIGITAL WORLD </h1>
    <h2 className="about--h2 mar--2"> ABOUT US </h2>
    <div className="about--p">
      <p>Future Legacy’s mission is to build a global community dedicated to preserve and make available as much of our
        collective visual history as possible, while helping to give owners of the work control over licensing as well as
        a
        sustainable percentage of the sales profits. We will achieve this goal by creating a simple but extremely
        trustworthy blockchain service layer and unique proprietary ai search mechanisms to securely connect cloud/server
        based archives into a decentralized, globally searchable database and locally configurable marketplace.
      </p>
      <p> We don’t overwhelm you with extraneous choices. Our proprietary search mechanism uses ai technology to
        ‘converse’
        with the user and then select a highly ‘curated’ selection of images and the way we connect your server to the
        world
        means we are changing the cultural paradigm forever.</p>
    </div>


    <h2 className="about--h2 mar--2"> FAQ</h2>
    <div className="accordion--cont">
      <Accordion title="How To Connect?">
        <p className="accordion--content">Content for section 1 goes here</p>
      </Accordion>
      <Accordion title="Who Can Connect?">
        <p className="accordion--content">Content for section 2 goes here</p>
      </Accordion>
      <Accordion title="What We Are Not?">
        <p className="accordion--content">
          We are not an NFT marketplace. We do not sell NFTs or tokens. We connect the highest quality digital assets and allow the user to 'license' the asset in a variety of unique ways.
        </p>
      </Accordion>
      <Accordion title="Unique Aspects and Buisness Structure?">
        <p className="accordion--content">Content for section 3 goes here</p>
      </Accordion>
    </div>
    <h2 className="about--h2 mar--2">THE TEAM</h2>
    <div className="about--horiz--img--cont">
      <TeamImg 
      imgUrl="https://firebasestorage.googleapis.com/v0/b/futurelegacy-test.appspot.com/o/FL_TeamPictures%2FRectangle%20213.png?alt=media&token=31bd60c9-e97e-41b2-9438-f1fdb308a089" 
      name="Jon Lowenstein" 
      description="Founder"/>
      <TeamImg 
      imgUrl="https://firebasestorage.googleapis.com/v0/b/futurelegacy-test.appspot.com/o/FL_TeamPictures%2FRectangle%20214.png?alt=media&token=4d1d364a-55c1-4637-bfe9-5d9d645c7c40" 
      name="Michael Breer" 
      description="AR/VR/3D"/>
      <TeamImg 
      imgUrl="https://firebasestorage.googleapis.com/v0/b/futurelegacy-test.appspot.com/o/FL_TeamPictures%2FRectangle%20215.png?alt=media&token=dba6a40b-f2ac-4525-8b07-b369a3957e12" 
      name="Karen Eng" 
      description="Innovation"/>
      {/* <TeamImg 
      imgUrl="https://firebasestorage.googleapis.com/v0/b/futurelegacy-test.appspot.com/o/FL_TeamPictures%2FRectangle%20216.png?alt=media&token=92e63586-69eb-4f13-91f2-5daf339822d3" 
      name="Meg Handler" 
      description="Curator"/>
      <TeamImg 
      imgUrl="https://firebasestorage.googleapis.com/v0/b/futurelegacy-test.appspot.com/o/FL_TeamPictures%2FRectangle%20217.png?alt=media&token=98d74186-7f40-439d-b996-e58cf91fe7fc" 
      name="Yizhe Lin" 
      description="Business Lead"/> */}
    </div>
    <h2 className="about--h2 mar--2">THE ADVISORS</h2>
    <div className="about--horiz--img--cont">
      <TeamImg 
      imgUrl="https://firebasestorage.googleapis.com/v0/b/futurelegacy-test.appspot.com/o/FL_TeamPictures%2FRectangle%20218.png?alt=media&token=54a2b971-e158-4b17-9c49-8c2f9db4088a" 
      name="Chikai Ohazama" 
      />
      <TeamImg 
      imgUrl="https://firebasestorage.googleapis.com/v0/b/futurelegacy-test.appspot.com/o/FL_TeamPictures%2FRectangle%20219.png?alt=media&token=31ffee79-1ce1-4987-b495-ebd7dbfc1487" 
      name="Randy Olson" 
      />
      <TeamImg 
      imgUrl="https://firebasestorage.googleapis.com/v0/b/futurelegacy-test.appspot.com/o/FL_TeamPictures%2FRectangle%20221.png?alt=media&token=5fd5edb5-7222-4adf-acb4-f06165ddfd1c" 
      name="David GuttenFelder" 
      />
      <TeamImg 
      imgUrl="https://firebasestorage.googleapis.com/v0/b/futurelegacy-test.appspot.com/o/FL_TeamPictures%2FRectangle%20220.png?alt=media&token=08ff2cef-2bfc-492a-b864-33fdfeb984ff" 
      name="Juliet Dervin" 
      />
    </div>
  </StyledContainer_v2>
  )
}

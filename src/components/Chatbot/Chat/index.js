import { Avatar, Paper, Stack, Typography } from '@mui/material';
import MarkdownView from 'react-showdown';
import logo from '~/assets/robot.png';
import JobCard from '~/components/Jobs/JobCard';
import RelativeContent from '~/components/Jobs/RelativeContent';
import ChatLoader from '~/components/UI/ChatLoader';

const Chat = ({ isAnswer, content, onClick, loading, onRelativeClick }) => {
  return (
    <Paper
      sx={{
        width: '100%',
        bgcolor: 'transparent',
        display: 'flex',
        gap: 1,
        justifyContent: isAnswer ? 'flex-start' : 'flex-end',
      }}
    >
      {isAnswer && <Avatar sx={{ display: { xs: 'none', md: 'flex' } }} src={logo}></Avatar>}
      <Paper
        sx={{
          width: 'content-fit',
          marginLeft: !isAnswer && '10%',
          marginRight: isAnswer && '10%',
          bgcolor: isAnswer ? '#f1f3f5' : '#fff',
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: isAnswer ? '#e9ecef' : '#ccc',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        {loading ? (
          <ChatLoader />
        ) : (
          <MarkdownView
            className="markdown"
            markdown={isAnswer ? content.answer : content.message}
            options={{ tables: true, emoji: true }}
          />
        )}
        {content?.jobs && content?.jobs?.length !== 0 && isAnswer && !loading && (
          <Stack spacing={{ xs: 1 }} direction="row" useFlexGap flexWrap="wrap">
            <Typography sx={{ display: 'block', width: '100%' }}>Jobs:</Typography>
            {content?.jobs?.map((item, index) => (
              <JobCard key={index} job={item} onClick={onClick}></JobCard>
            ))}
          </Stack>
        )}
        {content?.related_topics && content?.related_topics?.length !== 0 && isAnswer && !loading && (
          <Stack spacing={{ xs: 1 }} direction="row" useFlexGap flexWrap="wrap">
            <Typography sx={{ display: 'block', width: '100%' }}>Relative topics:</Typography>
            {content?.related_topics?.map((item, index) => (
              <RelativeContent key={index} topic={item} onClick={onRelativeClick}></RelativeContent>
            ))}
          </Stack>
        )}

        {content?.imageUrl && !isAnswer && (
          <img
            src={content?.imageUrl}
            alt=""
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '8px',
              objectFit: 'cover',
              marginLeft: 'auto',
            }}
          />
        )}
      </Paper>
    </Paper>
  );
};

export default Chat;

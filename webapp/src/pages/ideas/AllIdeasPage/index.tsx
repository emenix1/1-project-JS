import { getViewIdeaRoute } from '../../../lib/routes';
import { Segment } from '../../../components/Segment'
import { trpc } from '../../../lib/trpc';
import { Link } from 'react-router-dom';
import css from './index.module.scss'

export const AllIdeasPage = () => {
  const {data, error, isLoading, isFetching} = trpc.getIdeas.useQuery();
  
  if (isLoading || isFetching) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error: {error.message}</div>
  }
  if (!data || !data.ideas || data.ideas.length === 0) {
    return <div>No ideas found</div>
  }
  
    return (
    <Segment title="All Ideas">

      <div className={css.ideas}>
        {data.ideas.map((idea) => (
          <div className={css.idea} key={idea.nick}>
            <Segment
              size={2}
              title={
                <Link className={css.ideaLink} to={getViewIdeaRoute({ ideaNick:idea.nick })}>
                  {idea.name}
                </Link>
              }
              description={idea.description}
            />
          </div>
        ))}
      </div>
    </Segment>
  )
}
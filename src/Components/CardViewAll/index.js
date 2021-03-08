import React from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import http from '../../Services';

// import all components
import {Card, Title, Genre, Image} from './styles';

export default function CardViewAll(props) {
  const navigation = useNavigation();
  const [movie, setMovie] = React.useState({});

  React.useEffect(() => {
    const fetchFilm = async () => {
      try {
        const {data} = await http.getMovieById(props.id);
        setMovie(data.results);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    fetchFilm();
  }, []);

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate('MovieDetail', {movieId: props.id})}>
      <Card {...props}>
        <Image
          source={{
            uri: props.poster,
          }}
        />
        <Title>{movie.title}</Title>
        <Genre>{movie.genres}</Genre>
      </Card>
    </TouchableWithoutFeedback>
  );
}

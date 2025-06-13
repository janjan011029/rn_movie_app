import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import TrendingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import "../global.css";

export default function Index() {
  const router = useRouter();

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTrendingMovies);

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />

      {moviesLoading || trendingLoading ? (
        <ActivityIndicator
          size="large"
          color="#000ff"
          className="mt-20 self-center"
        />
      ) : moviesError || trendingError ? (
        <Text className="text-white mt-20 self-center">
          Error: {moviesError?.message || trendingError?.message}
        </Text>
      ) : (
        <FlatList
          data={movies}
          numColumns={3}
          ListHeaderComponent={
            <>
              <Image
                source={icons.logo}
                className="w-12 h-10 mt-20 mx-auto mb-8"
              />
              <SearchBar
                onPress={() => router.push("/search")}
                placeHolder="Search for movies, series, and more"
              />
              {trendingMovies && (
                <View className="mt-5">
                  <Text className="text-lg text-white font-bold mb-3">
                    Trending Movies
                  </Text>

                  <FlatList
                    data={trendingMovies}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View className="w-4" />}
                    keyExtractor={(item) => item.movie_id.toString()}
                    renderItem={({ item, index }) => (
                      // <MovieCard id={item.movie_id} title={item.title} />
                      // <Text className="text-white">{item.title}</Text>
                      <TrendingCard movie={item} index={index} />
                    )}
                  />
                </View>
              )}

              <Text className="text-lg text-white font-bold mt-5 mb-3">
                Latest Movies
              </Text>
            </>
          }
          renderItem={({ item }) => <MovieCard {...item} />}
          keyExtractor={(item) => item.id.toString()}
          columnWrapperStyle={{
            justifyContent: "flex-start",
            gap: 20,
            paddingRight: 5,
            marginBottom: 10,
          }}
          className="mt-2 pb-32 mx-5"
          scrollEnabled={true}
        />
      )}
    </View>
  );
}

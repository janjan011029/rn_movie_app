import { images } from "@/constants/images";
import MaskedView from "@react-native-masked-view/masked-view";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const TrendingCard = ({
  movie: { movie_id, title, poster_url, rating },
  index,
}: TrendingCardProps) => {
  return (
    <Link href={`/movies/${movie_id}`} asChild>
      <TouchableOpacity className="w-32 relative pl-1">
        <Image
          source={{ uri: poster_url }}
          className="w-32 h-48 rounded-lg"
          resizeMode="cover"
        />

        <View className="absolute top-1 -right-0 bg-gray-700/80 px-2 py-1 rounded-md flex-row items-center">
          <Text className="text-yellow-400 text-xs mr-1">★</Text>
          <Text className="text-white text-xs font-semibold">
            {rating.toFixed(1)}
          </Text>
        </View>

        <View className="absolute bottom-9 -left-3.5">
          <MaskedView
            maskElement={
              <View className="items-center justify-center w-14 h-14">
                <Text className="font-bold text-white text-6xl">
                  {index + 1}
                </Text>
              </View>
            }
          >
            <Image
              source={images.rankingGradient}
              className="size-14"
              resizeMode="cover"
            />
          </MaskedView>
        </View>
        <Text
          className="text-sm font-bold mt-2 text-light-200"
          numberOfLines={1}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCard;

package aoc.kenavr;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Arrays;
import java.util.Objects;

class Utils {
    static int[] loadInputs(String path) {
        try {
            ClassLoader classLoader = Utils.class.getClassLoader();
            File file = new File(Objects.requireNonNull(classLoader.getResource(path)).getFile());
            String content = Files.readString(file.toPath());
            return  Arrays.stream(content.split(","))
                    .map(String::trim)
                    .map(Integer::parseInt)
                    .mapToInt(i -> i).toArray();

        } catch (IOException e) {
            System.err.println(String.format("Error loading path '%s': %s", path, e.getMessage()));
            return new int[]{};
        }
    }
}

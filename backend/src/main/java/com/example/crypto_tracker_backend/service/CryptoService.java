package com.example.crypto_tracker_backend.service;

import com.example.crypto_tracker_backend.model.Crypto;
import com.example.crypto_tracker_backend.repository.CryptoRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.*;


//@Service
//public class CryptoService {
//
//    @Autowired
//    private CryptoRepository cryptoRepository;
//
//    private static final String API_BASE_URL = "https://api.coingecko.com/api/v3/";
//    private final ObjectMapper objectMapper = new ObjectMapper(); // ✅ Use Jackson ObjectMapper
//
//    // ✅ Fetch latest crypto prices and save to DB
//    @Cacheable(value = "cryptoPrices", key = "'all'", sync = true)
//    public List<Crypto> fetchCryptoPrices() {
//        String cryptoIds = "bitcoin,ethereum,dogecoin,cardano,solana,ripple,polkadot,shiba-inu,chainlink,stellar," +
//                           "litecoin,tron,uniswap,bitcoin-cash,avalanche";
//        
//        String url = API_BASE_URL + "coins/markets?vs_currency=usd&ids=" + cryptoIds + "&order=market_cap_desc&per_page=15&page=1&sparkline=false";
//
//        RestTemplate restTemplate = new RestTemplate();
//        String jsonResponse = restTemplate.getForObject(url, String.class); // ✅ Get JSON as String
//        
//        List<Crypto> cryptos = new ArrayList<>();
//
//        try {
//            JsonNode responseArray = objectMapper.readTree(jsonResponse); // ✅ Convert to JsonNode
//
//            if (responseArray.isArray()) {
//                for (JsonNode obj : responseArray) {
//                    Crypto crypto = new Crypto();
//                    crypto.setName(obj.get("name").asText());
//                    crypto.setSymbol(obj.get("symbol").asText().toUpperCase());
//                    crypto.setPrice(obj.get("current_price").asDouble());
//                    crypto.setImage(obj.get("image").asText());
//
//                    // ✅ Fix for Market Cap (Avoid NullPointerException)
//                    JsonNode marketCapNode = obj.get("market_cap");
//                    crypto.setMarketCap((marketCapNode != null && marketCapNode.isNumber()) ? marketCapNode.asDouble() : 0.0);
//
//                    // Save to DB
//                    cryptoRepository.save(crypto);
//                    cryptos.add(crypto);
//                }
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        return cryptos;
//    }
//
//    // ✅ Get all cryptos from DB
//    public List<Crypto> getAllCryptos() {
//        return cryptoRepository.findAll();
//    }
//
//    // ✅ Fetch historical price data for a given crypto (last 90 days)
//    public List<Map<String, Object>> fetchCryptoHistory(String id) {
//        String url = API_BASE_URL + "coins/" + id + "/market_chart?vs_currency=usd&days=90";
//
//        RestTemplate restTemplate = new RestTemplate();
//        String jsonResponse = restTemplate.getForObject(url, String.class); // ✅ Get JSON as String
//        List<Map<String, Object>> history = new ArrayList<>();
//
//        try {
//            JsonNode rootNode = objectMapper.readTree(jsonResponse); // ✅ Convert to JsonNode
//            JsonNode pricesArray = rootNode.get("prices");
//
//            if (pricesArray.isArray()) {
//                for (JsonNode priceData : pricesArray) {
//                    long timestamp = priceData.get(0).asLong();
//                    double price = priceData.get(1).asDouble();
//
//                    Map<String, Object> dataPoint = new HashMap<>();
//                    dataPoint.put("timestamp", timestamp);
//                    dataPoint.put("price", price);
//                    history.add(dataPoint);
//                }
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//
//        return history;
//    }
//}
@Service
public class CryptoService {

    @Autowired
    private CryptoRepository cryptoRepository;

    private static final String API_BASE_URL = "https://api.coingecko.com/api/v3/";
    private final ObjectMapper objectMapper = new ObjectMapper(); // ✅ Use Jackson ObjectMapper
    private final RestTemplate restTemplate = new RestTemplate(); // ✅ Use a single RestTemplate instance

    // ✅ Fetch latest crypto prices and save to DB
    @Cacheable(value = "cryptoPrices", key = "'all'", sync = true)
    public List<Crypto> fetchCryptoPrices() {
        String cryptoIds = "bitcoin,ethereum,dogecoin,cardano,solana,ripple,polkadot,shiba-inu,chainlink,stellar," +
                           "litecoin,tron,uniswap,bitcoin-cash,avalanche";
        
        String url = API_BASE_URL + "coins/markets?vs_currency=usd&ids=" + cryptoIds + 
                     "&order=market_cap_desc&per_page=15&page=1&sparkline=false";

        List<Crypto> cryptos = new ArrayList<>();

        try {
            String jsonResponse = restTemplate.getForObject(url, String.class); // ✅ Get JSON as String
            JsonNode responseArray = objectMapper.readTree(jsonResponse); // ✅ Convert to JsonNode

            if (responseArray.isArray()) {
                for (JsonNode obj : responseArray) {
                    Crypto crypto = new Crypto();
                    crypto.setName(obj.get("name").asText());
                    crypto.setSymbol(obj.get("symbol").asText().toUpperCase());
                    crypto.setPrice(obj.get("current_price").asDouble());
                    crypto.setImage(obj.get("image").asText());

                    // ✅ Fix for Market Cap (Avoid NullPointerException)
                    JsonNode marketCapNode = obj.get("market_cap");
                    crypto.setMarketCap((marketCapNode != null && marketCapNode.isNumber()) ? marketCapNode.asDouble() : 0.0);

                    // Save to DB
                    cryptoRepository.save(crypto);
                    cryptos.add(crypto);
                }
            }
        } catch (HttpClientErrorException e) {
            if (e.getStatusCode().value() == 429) {
                System.err.println("❌ API Rate Limit Exceeded (429): Try again later.");
            } else {
                System.err.println("❌ API Error: " + e.getMessage());
            }
        } catch (HttpServerErrorException e) {
            System.err.println("❌ CoinGecko Server Error (500+): " + e.getMessage());
        } catch (Exception e) {
            System.err.println("❌ Unexpected Error: " + e.getMessage());
        }

        return cryptos; // ✅ Return empty list instead of failing
    }

    // ✅ Get all cryptos from DB
    public List<Crypto> getAllCryptos() {
        return cryptoRepository.findAll();
    }

    // ✅ Fetch historical price data for a given crypto (last 90 days)
    public List<Map<String, Object>> fetchCryptoHistory(String id) {
        String url = API_BASE_URL + "coins/" + id + "/market_chart?vs_currency=usd&days=90";

        List<Map<String, Object>> history = new ArrayList<>();

        try {
            String jsonResponse = restTemplate.getForObject(url, String.class); // ✅ Get JSON as String
            JsonNode rootNode = objectMapper.readTree(jsonResponse); // ✅ Convert to JsonNode
            JsonNode pricesArray = rootNode.get("prices");

            if (pricesArray != null && pricesArray.isArray()) {
                for (JsonNode priceData : pricesArray) {
                    long timestamp = priceData.get(0).asLong();
                    double price = priceData.get(1).asDouble();

                    Map<String, Object> dataPoint = new HashMap<>();
                    dataPoint.put("timestamp", timestamp);
                    dataPoint.put("price", price);
                    history.add(dataPoint);
                }
            }
        } catch (HttpClientErrorException e) {
            if (e.getStatusCode().value() == 429) {
                System.err.println("❌ API Rate Limit Exceeded (429): Try again later.");
            } else {
                System.err.println("❌ API Error: " + e.getMessage());
            }
        } catch (HttpServerErrorException e) {
            System.err.println("❌ CoinGecko Server Error (500+): " + e.getMessage());
        } catch (Exception e) {
            System.err.println("❌ Unexpected Error: " + e.getMessage());
        }

        return history; // ✅ Return empty list instead of failing
    }
}

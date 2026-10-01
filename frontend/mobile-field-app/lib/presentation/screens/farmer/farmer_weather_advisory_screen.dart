import 'package:flutter/material.dart';
import '../../../core/theme/app_theme.dart';

class FarmerWeatherAdvisoryScreen extends StatefulWidget {
  final VoidCallback? onBack;

  const FarmerWeatherAdvisoryScreen({super.key, this.onBack});

  @override
  State<FarmerWeatherAdvisoryScreen> createState() => _FarmerWeatherAdvisoryScreenState();
}

class _FarmerWeatherAdvisoryScreenState extends State<FarmerWeatherAdvisoryScreen> {
  bool _isPlayingAudio = false;
  String _audioLanguage = 'Amharic';

  final List<Map<String, dynamic>> _forecastDays = [
    {'day': 'Tue (Today)', 'temp': '24°C', 'rain': '4 mm', 'risk': 'Light Shower', 'color': AppColors.secondary},
    {'day': 'Wed', 'temp': '26°C', 'rain': '0 mm', 'risk': 'Sunny • Optimal Weeding', 'color': AppColors.secondary},
    {'day': 'Thu', 'temp': '23°C', 'rain': '2 mm', 'risk': 'Cloudy Morning', 'color': AppColors.secondary},
    {'day': 'Fri', 'temp': '20°C', 'rain': '28 mm', 'risk': 'Heavy Rain • Postpone Fertilizer', 'color': const Color(0xFFC05621)},
    {'day': 'Sat', 'temp': '21°C', 'rain': '14 mm', 'risk': 'Moderate Rainfall', 'color': AppColors.secondary},
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.surface,
      appBar: AppBar(
        titleSpacing: widget.onBack != null ? 0 : 16,
        leading: widget.onBack != null
            ? IconButton(
                icon: const Icon(Icons.arrow_back),
                onPressed: widget.onBack,
              )
            : (Navigator.canPop(context)
                ? IconButton(
                    icon: const Icon(Icons.arrow_back),
                    onPressed: () => Navigator.pop(context),
                  )
                : null),
        title: const Text('Agro-Weather & Advisory'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Current Weather Card
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: AppColors.borderClean),
              ),
              child: const Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Jimma Woreda • Mana Station', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: AppColors.onSurface)),
                          SizedBox(height: 2),
                          Text('Elevation: 1,740m • Relative Humidity: 82%', style: TextStyle(fontSize: 11, color: AppColors.onSurfaceVariant)),
                        ],
                      ),
                      Icon(Icons.wb_sunny, color: Color(0xFFC05621), size: 32),
                    ],
                  ),
                  SizedBox(height: 14),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text('24°C', style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold, color: AppColors.primaryContainer)),
                      Text('Mild Overcast • Wind: 8 km/h NW', style: TextStyle(fontSize: 12, color: AppColors.onSurfaceVariant)),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // 5-Day Rainfall Alert Strip
            const Text(
              '5-Day Rainfall Precipitation Forecast',
              style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: AppColors.onSurface),
            ),
            const SizedBox(height: 8),
            Container(
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: AppColors.borderClean),
              ),
              child: ListView.separated(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                itemCount: _forecastDays.length,
                separatorBuilder: (_, __) => const Divider(height: 1, color: AppColors.borderClean),
                itemBuilder: (context, index) {
                  final day = _forecastDays[index];
                  final color = day['color'] as Color;

                  return Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        SizedBox(
                          width: 85,
                          child: Text(day['day'] as String, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppColors.onSurface)),
                        ),
                        Text(day['temp'] as String, style: const TextStyle(fontSize: 12, color: AppColors.outline)),
                        Text(day['rain'] as String, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppColors.primaryContainer)),
                        Expanded(
                          child: Text(
                            day['risk'] as String,
                            textAlign: TextAlign.end,
                            style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: color),
                          ),
                        ),
                      ],
                    ),
                  );
                },
              ),
            ),
            const SizedBox(height: 20),

            // Research Agronomist Voice Advisory Card
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppColors.surfaceContainerLow,
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: AppColors.secondary.withValues(alpha: 0.3)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Row(
                        children: [
                          Icon(Icons.record_voice_over, color: AppColors.secondary, size: 20),
                          SizedBox(width: 8),
                          Text('Extension Audio Advisory', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: AppColors.primary)),
                        ],
                      ),
                      DropdownButton<String>(
                        value: _audioLanguage,
                        underline: const SizedBox(),
                        style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppColors.secondary),
                        items: const [
                          DropdownMenuItem(value: 'Amharic', child: Text('Amharic (አማርኛ)')),
                          DropdownMenuItem(value: 'Afaan Oromoo', child: Text('Afaan Oromoo')),
                        ],
                        onChanged: (val) {
                          if (val != null) setState(() => _audioLanguage = val);
                        },
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  Text(
                    _audioLanguage == 'Amharic'
                        ? 'የአፈር እርጥበት እና የማዳበሪያ አጠቃቀም ሳምንታዊ ምክር (54 ሰከንድ)'
                        : "Gorsa eegumsa midhaanii fi yeroo xaa'oo naannoo Jimmaa (54 sec)",
                    style: const TextStyle(fontSize: 12, color: AppColors.onSurfaceVariant),
                  ),
                  const SizedBox(height: 12),
                  Row(
                    children: [
                      IconButton.filled(
                        icon: Icon(_isPlayingAudio ? Icons.pause : Icons.play_arrow),
                        style: IconButton.styleFrom(backgroundColor: AppColors.secondary),
                        onPressed: () {
                          setState(() => _isPlayingAudio = !_isPlayingAudio);
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(
                              content: Text(_isPlayingAudio ? 'Playing extension audio advisory...' : 'Audio paused.'),
                              duration: const Duration(milliseconds: 900),
                            ),
                          );
                        },
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: LinearProgressIndicator(
                          value: _isPlayingAudio ? 0.42 : 0.0,
                          backgroundColor: Colors.white,
                          valueColor: const AlwaysStoppedAnimation<Color>(AppColors.secondary),
                          minHeight: 6,
                          borderRadius: BorderRadius.circular(3),
                        ),
                      ),
                      const SizedBox(width: 10),
                      const Text('0:54', style: TextStyle(fontSize: 11, color: AppColors.outline)),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // Agronomic Action Bulletins
            const Text(
              'Field Action Bulletins for the Week',
              style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: AppColors.onSurface),
            ),
            const SizedBox(height: 10),
            _buildBulletinCard('1. Fall Armyworm Scouting Alert', 'Inspect outer rows of maize and teff every 3 mornings. If small pin-hole leaf damage appears, alert your extension agent.', AppColors.error),
            const SizedBox(height: 10),
            _buildBulletinCard('2. Fertilizer Broadcasting Timing', 'Heavy rainfall is forecast for Friday. Do not apply top-dressing urea on Thursday or Friday to prevent runoff leaching.', const Color(0xFFC05621)),
            const SizedBox(height: 10),
            _buildBulletinCard('3. Furrow Drainage Maintenance', 'Clear earthen runoff ditches across slopes to prevent standing water in vertisol clay plots.', AppColors.secondary),
          ],
        ),
      ),
    );
  }

  Widget _buildBulletinCard(String title, String detail, Color accentColor) {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppColors.borderClean),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: 4,
            height: 48,
            decoration: BoxDecoration(
              color: accentColor,
              borderRadius: BorderRadius.circular(2),
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: AppColors.onSurface)),
                const SizedBox(height: 4),
                Text(detail, style: const TextStyle(fontSize: 11, color: AppColors.onSurfaceVariant, height: 1.3)),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

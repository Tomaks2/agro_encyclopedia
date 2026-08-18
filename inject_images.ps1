$repo = "d:\1\agro_encyclopedia-main\content\cultures"

# Допоміжна функція для вставки картинки після першого заголовка H2
function Insert-Image ($file, $imgName, $culture, $altText) {
    if (-not (Test-Path $file)) { Write-Host "File not found: $file" -ForegroundColor Red; return }
    $lines = Get-Content $file
    
    # Перевіряємо чи картинка вже там є
    if ($lines -match $imgName) { return }
    
    $out = @()
    $inserted = $false
    foreach ($line in $lines) {
        $out += $line
        if (!$inserted -and $line -match '^## ') {
            $out += ""
            $out += "<LightboxImage src="/photos/$culture/charts/$imgName" alt="$altText" />"
            $out += ""
            $inserted = $true
        }
    }
    
    # Якщо заголовка H2 немає, вставляємо на початку після фронтматер (якщо є)
    if (!$inserted) {
        $out = @("<LightboxImage src="/photos/$culture/charts/$imgName" alt="$altText" />", "") + $lines
    }
    
    [System.IO.File]::WriteAllLines($file, $out, [System.Text.UTF8Encoding]::new($false))
    Write-Host "Inserted $imgName into $file" -ForegroundColor Green
}

# 1. PERSYK
$pPath = "$repo\persyk"
Insert-Image "$pPath\01-biolohiya.md" "life_cycle_persyk.png" "persyk" "Життєвий цикл персика"
Insert-Image "$pPath\02-pidshchepy.md" "rootstocks_persyk.png" "persyk" "Підщепи персика"
Insert-Image "$pPath\03-sorty.md" "varieties_persyk.png" "persyk" "Сорти персика"
Insert-Image "$pPath\04-posadka.md" "planting_pit_persyk.png" "persyk" "Посадкова яма"
Insert-Image "$pPath\05-formuvannia.md" "vase_pruning_persyk.png" "persyk" "Формування чаші"
Insert-Image "$pPath\06-obrizka.md" "pruning_persyk.png" "persyk" "Обрізка персика"
Insert-Image "$pPath\07-zeleni-operatsii.md" "fruit_thinning_persyk.png" "persyk" "Проріджування зав'язі"
Insert-Image "$pPath\08-zhyvlennia.md" "fertilizer_calendar_persyk.png" "persyk" "Календар живлення"
Insert-Image "$pPath\09-polyv.md" "watering_persyk.png" "persyk" "Полив персика"
Insert-Image "$pPath\10-khvoroby.md" "diseases_persyk.png" "persyk" "Хвороби персика"
Insert-Image "$pPath\13-zakhyst-kalendar.md" "protection_calendar_persyk.png" "persyk" "Календар захисту"
Insert-Image "$pPath\14-zamorozky.md" "cold_hours_persyk.png" "persyk" "Години холоду та заморозки"

# 2. ABRYKOS
$aPath = "$repo\abrykos"
Insert-Image "$aPath\01-biolohiya.md" "bloom_naked_abrykos.png" "abrykos" "Цвітіння абрикоса"
Insert-Image "$aPath\05-formuvannia.md" "chasha_years_abrykos.png" "abrykos" "Формування чаші по роках"
Insert-Image "$aPath\19-zamorozky.md" "frost_stages_abrykos.png" "abrykos" "Стадії заморозків"
Insert-Image "$aPath\14-scheplennia.md" "grafting_timeline_abrykos.png" "abrykos" "Календар щеплення"
Insert-Image "$aPath\15-zbir-zberihannia.md" "harvest_stages_abrykos.png" "abrykos" "Етапи збору врожаю"
Insert-Image "$aPath\16-sushynnia-kurahy.md" "kuraha_process_abrykos.png" "abrykos" "Процес виготовлення кураги"
Insert-Image "$aPath\10-khvoroby.md" "moniliosis_forms_abrykos.png" "abrykos" "Форми моніліозу"
Insert-Image "$aPath\12-shkidnyky.md" "pests_abrykos.png" "abrykos" "Шкідники абрикоса"
Insert-Image "$aPath\13-kalendar-zakhystu.md" "protection_year_abrykos.png" "abrykos" "Річний календар захисту"
Insert-Image "$aPath\10-khvoroby.md" "shot_hole_abrykos.png" "abrykos" "Клястероспоріоз абрикоса"
Insert-Image "$aPath\09-polyv.md" "watering_calendar_abrykos.png" "abrykos" "Календар поливу"

# 3. CHERESHNIA
$cPath = "$repo\chereshnia"
Insert-Image "$cPath\14-scheplennia.md" "budding_chereshnia.png" "chereshnia" "Окулірування черешні"
Insert-Image "$cPath\09-polyv.md" "calcium_cracking_chereshnia.png" "chereshnia" "Розтріскування плодів"
Insert-Image "$cPath\12-shkidnyky.md" "cherry_fruit_fly_chereshnia.png" "chereshnia" "Вишнева муха"
Insert-Image "$cPath\17-zamorozky.md" "frost_phases_chereshnia.png" "chereshnia" "Вплив заморозків"
Insert-Image "$cPath\15-zbir-zberihannia.md" "harvest_cold_chain_chereshnia.png" "chereshnia" "Охолодження врожаю"
Insert-Image "$cPath\05-formuvannia.md" "kgb_ufo_chereshnia.png" "chereshnia" "Системи KGB та UFO"
Insert-Image "$cPath\10-khvoroby.md" "moniliosis_chereshnia.png" "chereshnia" "Моніліоз черешні"
Insert-Image "$cPath\16-mify.md" "myths_reality_chereshnia.png" "chereshnia" "Міфи та реальність"
Insert-Image "$cPath\01-biolohiya.md" "pollination_chereshnia.png" "chereshnia" "Запилення черешні"
Insert-Image "$cPath\13-kalendar-zakhystu.md" "protection_year_chereshnia.png" "chereshnia" "Календар захисту"
Insert-Image "$cPath\02-pidshchepy.md" "rootstock_vigor_chereshnia.png" "chereshnia" "Сили росту підщеп"
Insert-Image "$cPath\06-obrizka.md" "summer_pruning_chereshnia.png" "chereshnia" "Літня обрізка черешні"

# 4. SLYVA
$sPath = "$repo\slyva"
Insert-Image "$sPath\01-biolohiya.md" "cold_hardiness_slyva.png" "slyva" "Морозостійкість сливи"
Insert-Image "$sPath\08-zhyvlennia.md" "feeding_program_slyva.png" "slyva" "Програма живлення"
Insert-Image "$sPath\19-zamorozky.md" "frost_protection_slyva.png" "slyva" "Захист від заморозків"
Insert-Image "$sPath\14-scheplennia.md" "grafting_guide_slyva.png" "slyva" "Гайд зі щеплення"
Insert-Image "$sPath\15-zbir-zberihannia.md" "harvest_prunes_slyva.png" "slyva" "Збір чорносливу"
Insert-Image "$sPath\12-shkidnyky.md" "pests_chart_slyva.png" "slyva" "Шкідники сливи"
Insert-Image "$sPath\03-sorty.md" "pollination_plum_slyva.png" "slyva" "Запилення сливи"
Insert-Image "$sPath\10-khvoroby.md" "ppv_sharka_slyva.png" "slyva" "Шарка сливи (PPV)"
Insert-Image "$sPath\06-obrizka.md" "pruning_cuts_slyva.png" "slyva" "Правильні зрізи"
Insert-Image "$sPath\02-pidshchepy.md" "rootstock_chart_slyva.png" "slyva" "Підщепи сливи"
Insert-Image "$sPath\07-zeleni-operatsii.md" "thinning_slyva.png" "slyva" "Проріджування сливи"
Insert-Image "$sPath\05-formuvannia.md" "training_systems_slyva.png" "slyva" "Системи формування"
